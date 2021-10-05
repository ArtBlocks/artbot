require('dotenv').config();
const ARTBOT_IS_PROD = (process.env.ARTBOT_IS_PROD.toLowerCase() == 'true');
console.log('ARTBOT_IS_PROD: ', ARTBOT_IS_PROD);
const CHANNELS = ARTBOT_IS_PROD ?
  require('./channels.json') :
  require('./channels_dev.json');
const PROJECT_BOTS = ARTBOT_IS_PROD ?
  require('./projectBots.json') :
  require('./projectBots_dev.json');
const MINTER_CONTRACTS = require('./minterContracts.json');
const ProjectBot = require('../Classes/ProjectBot').ProjectBot;

// map from mint contract label to mint contract address
Object.keys(PROJECT_BOTS).forEach((_bot) => {
  PROJECT_BOTS[_bot].mintContract =
    MINTER_CONTRACTS[PROJECT_BOTS[_bot].mintContract];
});

// utility class that routes number messages for each channel
class Channel {
  constructor({ name, projectBotHandlers }) {
    this.name = name;
    this.hasProjectBotHandler = !!projectBotHandlers;
    if (projectBotHandlers) {
      this.default = projectBotHandlers.default;
      this.stringTriggers = projectBotHandlers.stringTriggers || undefined;
      this.tokenIdTriggers = projectBotHandlers.tokenIdTriggers || undefined;
    };
  };

  botNameFromNumberMsgContent(msgContentLowercase) {
    if (!this.hasProjectBotHandler) {
      return null;
    }
    // determine which project bot to send msg
    let projectBotName = this.default;
    // match with any string triggers
    if (this.stringTriggers) {
      stringTriggerLoop:
      for (const [botName, triggers] of Object.entries(this.stringTriggers)) {
        for (const triggerString of triggers) {
          if (msgContentLowercase.includes(triggerString)) {
            projectBotName = botName;
            break stringTriggerLoop;
          };
        };
      };
    };
    // match with any tokenID trigger ranges
    if (this.tokenIdTriggers) {
      let tokenID = msgContentLowercase.match(/\d+/);
      if (tokenID) {
        tokenID = parseInt(tokenID[0]);
        tokenIdTriggerLoop:
        for (const [botName, triggers] of Object.entries(this.tokenIdTriggers)) {
          if (Channel._inRange(tokenID, ...triggers)) {
            projectBotName = botName;
            break tokenIdTriggerLoop;
          };
        };
      };
    };
    // send to projectBot to handle the message
    return projectBotName;
  }

  // this returns if val is in inclusive range [minVal, maxVal].
  // treats null minVal as -inf, maxVal as +inf
  static _inRange(val, minVal, maxVal) {
    return ((minVal === null || val >= minVal) &&
      (maxVal === null || val <= maxVal));
  }
}

/*
* An instance of this class is exported to provide:
*  - interface to lookup minterContracts by label (e.g. OG, V2)
*  - interface to lookup channelIDs by name
*  - interface to route incoming messages from identified project channels.
*/
class ProjectConfig {
  constructor(minterContracts, projectBots, channels) {
    this.minterContracts = MINTER_CONTRACTS;
    this.projectBots = ProjectConfig.buildProjectBots(PROJECT_BOTS);
    this.channels = ProjectConfig.buildChannelHandlers(CHANNELS);
    this.chIdByName = ProjectConfig.buildChIdByName(this.channels);
  }

  static buildProjectBots(projectBotsJson) {
    const projectBots = {};
    Object.entries(projectBotsJson).forEach(([botName, botParams]) => {
      projectBots[botName] = new ProjectBot(botParams)
    });
    return projectBots;
  }

  static buildChannelHandlers(ChannelsJson) {
    const channels = {};
    Object.entries(ChannelsJson).forEach(([chID, chParams]) => {
      channels[chID] = new Channel(chParams);
    });
    return channels;
  }

  static buildChIdByName(channels) {
    const chIdByName = {};
    Object.entries(channels).forEach(([chID, channel]) => {
      chIdByName[channel.name] = chID;
    });
    return chIdByName;
  }

  routeProjectNumberMsg(channelID, msg) {
    const channel = this.channels[channelID];
    if (!channel) {
      // should never occur for anything we are being asked to route
      console.error(`Unknown channel ID: ${channelID}`);
      return;
    }
    const botName =
      channel.botNameFromNumberMsgContent(msg.content.toLowerCase());
    if (botName === null) {
      // should never occur for anything we are being asked to route
      console.error(`Channel ID: ${channelID} does not have a ProjectBot`);
    }
    this.projectBots[botName].handleNumberMessage(msg);
  }
}

let projectConfig = new ProjectConfig();
module.exports.projectConfig = projectConfig;