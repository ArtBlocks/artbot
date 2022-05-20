require('dotenv').config()
const ARTBOT_IS_PROD =
  process.env.ARTBOT_IS_PROD &&
  process.env.ARTBOT_IS_PROD.toLowerCase() == 'true'
console.log('ARTBOT_IS_PROD: ', ARTBOT_IS_PROD)
// Refresh takes around one minute, so recommend setting this to 60 minutes
const METADATA_REFRESH_INTERVAL_MINUTES =
  process.env.METADATA_REFRESH_INTERVAL_MINUTES
const CHANNELS = ARTBOT_IS_PROD
  ? require('./channels.json')
  : require('./channels_dev.json')
const PROJECT_BOTS = ARTBOT_IS_PROD
  ? require('./projectBots.json')
  : require('./projectBots_dev.json')
const ProjectBot = require('../Classes/ProjectBot').ProjectBot
const { getContractProject } = require('../Utils/parseArtBlocksAPI')
const PARTNER_CONTRACTS = require('../ProjectConfig/partnerContracts.json')

// utility class that routes number messages for each channel
class Channel {
  constructor({ name, projectBotHandlers }) {
    this.name = name
    this.hasProjectBotHandler = !!projectBotHandlers
    if (projectBotHandlers) {
      this.default = projectBotHandlers.default
      this.stringTriggers = projectBotHandlers.stringTriggers || undefined
      this.tokenIdTriggers = projectBotHandlers.tokenIdTriggers || undefined
    }
  }

  /*
   * This returns the appropriate project bot name to handle an incoming
   * number (^#) message, based on lowercase message content.
   * If any trigger words or trigger tokenID ranges are found, will
   * return name of appropriate non-default project bot.
   * If no trigger words or trigger tokenID ranges are found, will
   * return name of default project bot.
   * @return {string | null} name of project bot to handle message, null if
   * no project bot handlers defined for this Channel.
   */
  botNameFromNumberMsgContent(msgContentLowercase) {
    if (!this.hasProjectBotHandler) {
      return null
    }
    // determine which project bot to send msg
    let projectBotName = this.default
    // match with any string triggers
    if (this.stringTriggers) {
      stringTriggerLoop: for (const [botName, triggers] of Object.entries(
        this.stringTriggers
      )) {
        for (const triggerString of triggers) {
          if (msgContentLowercase.includes(triggerString)) {
            projectBotName = botName
            break stringTriggerLoop
          }
        }
      }
    }
    // match with any tokenID trigger ranges
    if (this.tokenIdTriggers) {
      let tokenID = msgContentLowercase.match(/\d+/)
      if (tokenID) {
        tokenID = parseInt(tokenID[0])
        tokenIdTriggerLoop: for (
          let i = 0;
          i < this.tokenIdTriggers.length;
          i++
        ) {
          const _botTriggerRange = this.tokenIdTriggers[i]
          for (const [botName, triggers] of Object.entries(_botTriggerRange)) {
            if (Channel._inRange(tokenID, ...triggers)) {
              projectBotName = botName
              break tokenIdTriggerLoop
            }
          }
        }
      }
    }
    // send to projectBot to handle the message
    return projectBotName
  }

  // this returns if val is in inclusive range [minVal, maxVal].
  // treats null minVal as -inf, maxVal as +inf
  static _inRange(val, minVal, maxVal) {
    return (
      (minVal === null || val >= minVal) && (maxVal === null || val <= maxVal)
    )
  }
}

/*
 * An instance of this class is exported to provide:
 *  - interface to lookup coreContracts by label (e.g. OG, V2)
 *  - interface to lookup channelIDs by name
 *  - interface to route incoming messages from identified project channels.
 */
class ProjectConfig {
  constructor() {
    this.channels = ProjectConfig.buildChannelHandlers(CHANNELS)
    this.chIdByName = ProjectConfig.buildChannelIDByName(this.channels)
    this.initialize()
  }

  // Initialize async aspects of the ProjectConfig
  async initialize() {
    try {
      this.projectBots = await this.buildProjectBots(CHANNELS, PROJECT_BOTS)
      setInterval(
        () => this.buildProjectBots(CHANNELS, PROJECT_BOTS),
        METADATA_REFRESH_INTERVAL_MINUTES * 60000
      )
    } catch (err) {
      console.error(`Error while initializing ProjectBots: ${err}`)
    }
  }

  /*
   * This parses imported projectBotsJson, channelsJson, and subgraph data to
   * return an object with keys equal to project ID and values pointing to a new
   * instance of ProjectBot. Returned object is useful for getting project bot
   * instances by project ID.
   */
  async buildProjectBots(channelsJson, projectBotsJson) {
    const projectBots = {}
    const projectBotConfigs = Object.entries(projectBotsJson)

    // Loops over channelsJson and adds all project IDs to a set of bots that
    // need to be instatiated.
    const botsToInstatiate = new Set()
    Object.keys(channelsJson).forEach((key) => {
      const projectBotHandlers = channelsJson[key].projectBotHandlers
      if (!projectBotHandlers) {
        return
      }
      botsToInstatiate.add(projectBotHandlers.default)
      const { stringTriggers = {}, tokenIdTriggers = [] } = projectBotHandlers
      Object.keys(stringTriggers).forEach((key) => {
        botsToInstatiate.add(key)
      })
      tokenIdTriggers.forEach((tokenTrigger) => {
        Object.keys(tokenTrigger).forEach((key) => {
          botsToInstatiate.add(key)
        })
      })
    })

    // This loops through all bots that need to be instatiated asynchronously,
    // gets the relevant configuration from projectBotsJson, calls the subgraph
    // to get project information, and then initializes the project bot.
    const promises = Array.from(botsToInstatiate).map(async (botId) => {
      const [projectId, contractName] = botId.split('-')
      const namedMappings = projectBotsJson[botId]?.namedMappings
      const configContract = PARTNER_CONTRACTS[contractName]
      if (contractName && !configContract) {
        console.warn(
          `Bot ${botId} had a contractName, but there was no matching contract in partnerContracts.json. Has it been defined?`
        )
      }
      const projectNumber = parseInt(projectId)
      const { invocations, name, contract } = await getContractProject(
        projectNumber,
        configContract
      )
      console.log(
        `Refreshing project cache for Project ${projectNumber} ${name}`
      )
      projectBots[botId] = new ProjectBot({
        projectNumber,
        coreContract: contract.id,
        editionSize: invocations,
        projectName: name,
        namedMappings,
      })
    })

    await Promise.all(promises)
    return projectBots
  }

  /*
   * This parses imported channels json data and returns an object with
   * keys equal to channel name, values pointing to a new instance of Channel.
   * Returned object is useful for getting channel instances by channel ID.
   */
  static buildChannelHandlers(ChannelsJson) {
    const channels = {}
    Object.entries(ChannelsJson).forEach(([chID, chParams]) => {
      channels[chID] = new Channel(chParams)
    })
    return channels
  }

  /*
   * This parses imported channels json data and returns an object with
   * keys equal to channel name, values equal to channel ID.
   * Returned object is useful for getting channel ID by channel name.
   */
  static buildChannelIDByName(channels) {
    const chIdByName = {}
    Object.entries(channels).forEach(([chID, channel]) => {
      chIdByName[channel.name] = chID
    })
    return chIdByName
  }

  /*
   * This routes an incoming number (^#) message intended to be routed to a
   * projectBot. It utilizes the logic in Channel method
   * botNameFromNumberMsgContent to determine which project bot should
   * handle the message (trigger words, token ID ranges, etc.).
   * @param {string} channelID Channel ID the incoming msg has been sent from.
   * @param msg Incoming discord.js message object
   */
  routeProjectNumberMsg(channelID, msg) {
    const channel = this.channels[channelID]
    const botName = channel.botNameFromNumberMsgContent(
      msg.content.toLowerCase()
    )
    if (botName === null) {
      // only occurs when # messages are sent in observed channels without project bots
      console.error(`Channel ID: ${channelID} does not have a ProjectBot`)
      return
    }
    this.projectBots[botName].handleNumberMessage(msg)
  }
}

let projectConfig = new ProjectConfig()
module.exports.projectConfig = projectConfig
