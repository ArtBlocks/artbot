require('dotenv').config()
const deburr = require('lodash.deburr')
const Web3 = require('web3')
const ProjectBot = require('./ProjectBot').ProjectBot
const getArtBlocksAndCollabProjects =
  require('../Utils/parseArtBlocksAPI').getArtBlocksAndCollabProjects
const getArtBlocksOpenProjects =
  require('../Utils/parseArtBlocksAPI').getArtBlocksOpenProjects
const getProjectsBirthdays =
  require('../Utils/parseArtBlocksAPI').getProjectsBirthdays
const getProjectsCurationStatus =
  require('../Utils/parseArtBlocksAPI').getProjectsCurationStatus
const getAllWalletTokens =
  require('../Utils/parseArtBlocksAPI').getAllWalletTokens
const resolveEnsName = require('./APIBots/utils').resolveEnsName
const isVerticalName = require('./APIBots/utils').isVerticalName
const getVerticalName = require('./APIBots/utils').getVerticalName

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')
const PROJECT_ALIASES = require('../ProjectConfig/project_aliases.json')
const { isWallet } = require('./APIBots/utils')

// Refresh takes around one minute, so recommend setting this to 60 minutes
const METADATA_REFRESH_INTERVAL_MINUTES =
  process.env.METADATA_REFRESH_INTERVAL_MINUTES

// RandomBot Stuff
const RANDOM_ART_AMOUNT = 10
// Time for random art (UTC) - 8am EST
const RANDOM_ART_TIME = new Date()
RANDOM_ART_TIME.setHours(12)
RANDOM_ART_TIME.setMinutes(0)
RANDOM_ART_TIME.setSeconds(0)
RANDOM_ART_TIME.setMilliseconds(0)

// Time for birthday check (UTC) - 10am EST
const BIRTHDAY_CHECK_TIME = new Date()
BIRTHDAY_CHECK_TIME.setHours(14)
BIRTHDAY_CHECK_TIME.setMinutes(0)
BIRTHDAY_CHECK_TIME.setSeconds(0)
BIRTHDAY_CHECK_TIME.setMilliseconds(0)

class ArtIndexerBot {
  constructor(projectFetch = getArtBlocksAndCollabProjects) {
    this.projectFetch = projectFetch
    this.projects = {}
    this.artists = {}
    this.birthdays = {}
    this.collectionMapping = {}
    this.sentBirthdays = {}
    this.walletTokens = {}
    this.init()
  }

  /**
   * Initialize async aspects of the FactoryBot
   */
  async init() {
    await this.buildProjectBots()

    setInterval(async () => {
      await this.buildProjectBots()
    }, METADATA_REFRESH_INTERVAL_MINUTES * 60000)
  }

  async buildProjectBots() {
    try {
      const projects = await this.projectFetch()
      const bdays = await getProjectsBirthdays()
      const collectionInfo = await getProjectsCurationStatus()
      const collections = collectionInfo[0]
      const heritageStatuses = collectionInfo[1]
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i]
        console.log(
          `Refreshing project cache for Project ${project.projectId} ${project.name}`
        )
        let bday = bdays[`${project.contract.id}-${project.projectId}`]
        const collection = this.toProjectKey(
          collections[`${project.contract.id}-${project.projectId}`]
        )
        const heritageStatus = this.toProjectKey(
          heritageStatuses[`${project.contract.id}-${project.projectId}`]
        )
        const newBot = new ProjectBot({
          projectNumber: project.projectId,
          coreContract: project.contract.id,
          editionSize: project.invocations,
          projectName: project.name,
          projectActive: project.active,
          artistName: project.artistName,
          collection: collection ?? null,
          heritageStatus: heritageStatus ?? null,
          startTime: bday ? new Date(bday) : null,
        })

        const projectKey = this.toProjectKey(project.name)
        this.projects[projectKey] = newBot

        if (bday) {
          const [year, month, day] = bday.split('T')[0].split('-')
          bday = month + '-' + day
          this.birthdays[bday] = this.birthdays[bday] ?? []
          this.birthdays[bday].push(newBot)
        }
        const artistName = this.toProjectKey(project.artistName)
        this.artists[artistName] = this.artists[artistName] ?? []
        this.artists[artistName].push(newBot)

        this.collectionMapping[collection] =
          this.collectionMapping[collection] ?? []
        this.collectionMapping[collection].push(newBot)
        if (heritageStatus) {
          // Umbrella 'heritage' status
          this.collectionMapping['heritage'] =
            this.collectionMapping['heritage'] ?? []
          this.collectionMapping['heritage'].push(newBot)

          // Individual heritage status (e.g. 'factory')
          this.collectionMapping[heritageStatus] =
            this.collectionMapping[heritageStatus] ?? []
          this.collectionMapping[heritageStatus].push(newBot)
        }
      }
    } catch (err) {
      console.error(`Error while initializing ArtIndexerBots\n${err}`)
    }
  }

  async handleNumberMessage(msg) {
    const content = msg.content

    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      )
      return
    }

    let afterTheHash = content
      .substr(content.indexOf(' ') + 1)
      .replace('?details', '')

    let projectKey = this.toProjectKey(afterTheHash)

    if (PROJECT_ALIASES[projectKey]) {
      projectKey = this.toProjectKey(PROJECT_ALIASES[projectKey])
    }

    // if '#?' message, get random project
    if (projectKey === '#?') {
      return this.sendRandomProjectRandomTokenMessage(msg, 1)
    } else if (projectKey === 'open') {
      return this.sendRandomOpenProjectRandomTokenMessage(msg)
    } else if (isVerticalName(projectKey)) {
      projectKey = getVerticalName(projectKey)
      return this.sendCurationStatusRandomTokenMessage(msg, projectKey)
    } else if (this.artists[projectKey]) {
      return this.sendArtistRandomTokenMessage(msg, projectKey)
    } else if (
      !this.projects[projectKey] &&
      isWallet(afterTheHash.split(' ')[0])
    ) {
      let wallet = afterTheHash.split(' ')[0]
      afterTheHash = afterTheHash.replace(wallet, '')
      projectKey = this.toProjectKey(afterTheHash)
      if (PROJECT_ALIASES[projectKey]) {
        projectKey = this.toProjectKey(PROJECT_ALIASES[projectKey])
      }

      if (
        projectKey &&
        !this.projects[projectKey] &&
        !this.artists[projectKey] &&
        !isVerticalName(projectKey)
      ) {
        msg.channel.send(
          `Sorry, I wasn't able to find that project: ${afterTheHash}`
        )
        return
      }

      return this.sendRandomWalletTokenMessage(msg, wallet, projectKey)
    }

    console.log(`Searching for project ${projectKey}`)
    const projBot = this.projects[projectKey]
    // TODO: handle PBAB projects (e.g. #? Plottables)
    if (projBot) {
      projBot.handleNumberMessage(msg)
    }
  }

  toProjectKey(projectName) {
    const projectKey = deburr(projectName)
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')

    // just in case there's a project name with no alphanumerical characters
    if (projectKey === '') {
      return deburr(projectName).toLowerCase().replace(/\s+/g, '')
    }

    return projectKey
  }

  async startRandomRoutine(channel) {
    let msg = {}
    msg.content = '#?'
    msg.channel = channel
    // Try to message(s) in #ab-art-chat every minute
    setInterval(() => {
      let now = new Date()
      // Only send message if hour and minute match up with specified time
      if (
        now.getHours() !== RANDOM_ART_TIME.getHours() ||
        now.getMinutes() !== RANDOM_ART_TIME.getMinutes()
      ) {
        return
      }
      this.sendRandomProjectRandomTokenMessage(msg, RANDOM_ART_AMOUNT)
    }, 1 * 60000)
  }

  async startBirthdayRoutine(channels, projectConfig) {
    setInterval(() => {
      let now = new Date()
      // Only send message if hour and minute match up with specified time
      if (
        now.getHours() !== BIRTHDAY_CHECK_TIME.getHours() ||
        now.getMinutes() !== BIRTHDAY_CHECK_TIME.getMinutes()
      ) {
        return
      }
      const [year, month, day] = now.toISOString().split('T')[0].split('-')
      if (this.birthdays[`${month}-${day}`]) {
        this.birthdays[`${month}-${day}`].forEach((projBot) => {
          if (
            projBot.startTime &&
            projBot.startTime.getFullYear().toString() !== year &&
            !this.sentBirthdays[projBot.projectNumber]
          ) {
            projBot.sendBirthdayMessage(channels, projectConfig)
            this.sentBirthdays[projBot.projectNumber] = true
          }
        })
      }
    }, 1 * 60000)
  }

  // This function takes a channel and sends a message containing a random
  // token from a random project
  async sendRandomProjectRandomTokenMessage(msg, numMessages) {
    let attempts = 0
    while (attempts < 10) {
      const keys = Object.keys(this.projects)
      let projectKey = keys[Math.floor(Math.random() * keys.length)]
      let projBot = this.projects[projectKey]
      if (projBot && projBot.editionSize > 1 && projBot.projectActive) {
        for (let i = 0; i < numMessages; i++) {
          projBot.handleNumberMessage(msg)
        }
        return
      }
      attempts++
    }
  }

  // This function takes a channel and sends a message containing a random
  // token from a random open project
  async sendRandomOpenProjectRandomTokenMessage(msg) {
    let attempts = 0
    while (attempts < 10) {
      const openProjects = await getArtBlocksOpenProjects()

      let project =
        openProjects[Math.floor(Math.random() * openProjects.length)]

      let projBot = this.projects[this.toProjectKey(project.name)]
      if (projBot && projBot.editionSize > 1 && projBot.projectActive) {
        return projBot.handleNumberMessage(msg)
      }
      attempts++
    }
  }

  async sendCurationStatusRandomTokenMessage(msg, collectionType) {
    let attempts = 0
    if (
      !this.collectionMapping[collectionType] ||
      this.collectionMapping[collectionType].length === 0
    ) {
      return
    }
    while (attempts < 10) {
      let projBot =
        this.collectionMapping[collectionType][
          Math.floor(
            Math.random() * this.collectionMapping[collectionType].length
          )
        ]

      if (projBot && projBot.editionSize > 1 && projBot.projectActive) {
        return projBot.handleNumberMessage(msg)
      }
      attempts++
    }
  }

  async sendArtistRandomTokenMessage(msg, artistName) {
    console.log('Looking for artist ' + artistName)
    let attempts = 0
    if (!this.artists[artistName] || this.artists[artistName].length === 0) {
      return
    }

    while (attempts < 10) {
      console.log(this.artists[artistName])
      let projBot =
        this.artists[artistName][
          Math.floor(Math.random() * this.artists[artistName].length)
        ]

      if (projBot && projBot.editionSize > 1 && projBot.projectActive) {
        return projBot.handleNumberMessage(msg)
      }
      attempts++
    }
  }

  // Sends a random token from this wallet's collection
  async sendRandomWalletTokenMessage(msg, wallet, projectKey = '') {
    console.log(
      `Getting random token${
        projectKey ? ` from ${projectKey}` : ''
      } in wallet ${wallet}`
    )
    try {
      // Resolve ENS name if ends in .eth
      if (wallet.toLowerCase().endsWith('.eth')) {
        let ensName = wallet

        wallet = await resolveEnsName(ensName)

        if (!wallet || wallet === '') {
          msg.channel.send(
            `Sorry, I wasn't able to resolve ENS name ${ensName}`
          )
          return
        }
      }

      wallet = wallet.toLowerCase()

      let tokens = []
      if (this.walletTokens[wallet]) {
        tokens = this.walletTokens[wallet]
      } else {
        tokens = await getAllWalletTokens(wallet)
        this.walletTokens[wallet] = tokens
      }

      if (tokens.length === 0) {
        msg.channel.send(
          `Sorry, I wasn't able to find any Art Blocks tokens in that wallet: ${wallet}`
        )
        return
      }

      if (projectKey) {
        if (this.artists[projectKey]) {
          // Random token from artist
          let tokensByArtist = []
          for (let index = 0; index < tokens.length; index++) {
            let token = tokens[index]

            if (
              this.toProjectKey(
                this.projects[this.toProjectKey(token.project.name)].artistName
              ) === projectKey
            ) {
              tokensByArtist.push(token)
            }
          }
          if (tokensByArtist.length === 0) {
            msg.channel.send(
              `Sorry, I wasn't able to find any tokens by ${projectKey} in that wallet: ${wallet}`
            )
            return
          }
          let _token =
            tokensByArtist[Math.floor(Math.random() * tokensByArtist.length)]
          let projBot = this.projects[this.toProjectKey(_token.project.name)]
          msg.content = `#${_token.invocation}`
          return projBot.handleNumberMessage(msg)
        } else if (isVerticalName(projectKey)) {
          // Random token from a vertical
          let tokensInVertical = []
          for (let index = 0; index < tokens.length; index++) {
            let token = tokens[index]
            let projBot = this.projects[this.toProjectKey(token.project.name)]
            if (
              projBot.collection.toLowerCase() === projectKey ||
              projBot.heritageStatus.toLowerCase() === projectKey ||
              (projectKey === 'heritage' && projBot.heritageStatus)
            ) {
              tokensInVertical.push(token)
            }
          }
          if (tokensInVertical.length === 0) {
            msg.channel.send(
              `Sorry, I wasn't able to find any ${projectKey} tokens in that wallet: ${wallet}`
            )
            return
          }
          let _token =
            tokensInVertical[
              Math.floor(Math.random() * tokensInVertical.length)
            ]
          let projBot = this.projects[this.toProjectKey(_token.project.name)]
          msg.content = `#${_token.invocation}`
          return projBot.handleNumberMessage(msg)
        } else {
          // Random token from project
          let tokensInProject = []
          for (let index = 0; index < tokens.length; index++) {
            let token = tokens[index]
            if (this.toProjectKey(token.project.name) === projectKey) {
              tokensInProject.push(token)
            }
          }
          if (tokensInProject.length === 0) {
            msg.channel.send(
              `Sorry, I wasn't able to find any ${projectKey} tokens in that wallet: ${wallet}`
            )
            return
          }
          let _token =
            tokensInProject[Math.floor(Math.random() * tokensInProject.length)]
          let projBot = this.projects[this.toProjectKey(projectKey)]
          msg.content = `#${_token.invocation}`
          return projBot.handleNumberMessage(msg)
        }
      }

      // Get a random token

      let attempts = 0
      while (attempts < 10) {
        let token = tokens[Math.floor(Math.random() * tokens.length)]

        console.log(`looking for wallet project: ${token.project.name}`)
        let projBot = this.projects[this.toProjectKey(token.project.name)]
        if (projBot) {
          msg.content = `#${token.invocation}`
          return projBot.handleNumberMessage(msg)
        } else {
          attempts++
        }
      }
      msg.channel.send(
        `Sorry, I had trouble finding an Art Blocks token in that wallet: ${wallet}`
      )
      return
    } catch (err) {
      console.log(`Error when getting wallet tokens: ${err}`)
      msg.channel.send(
        `Sorry, something unexpected went wrong - pester Grant about it til he fixes it :)`
      )
    }
  }
}

module.exports.ArtIndexerBot = ArtIndexerBot
