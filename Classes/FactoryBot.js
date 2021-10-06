require('dotenv').config();
const {
  MessageEmbed,
} = require('discord.js');
const fetch = require('node-fetch');
const Web3 = require('web3');
const getArtBlocksPlatform = require('../Utils/parseArtBlocksAPI').getArtBlocksPlatform;
const getArtBlocksProject = require('../Utils/parseArtBlocksAPI').getArtBlocksProject;
const isFactoryProject = require('../Utils/parseArtBlocksAPI').isFactoryProject;
const ProjectBot = require('./ProjectBot').ProjectBot;
const projectConfig = require('../ProjectConfig/projectConfig').projectConfig;

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

// Refresh takes around one minute, so recommend setting this to 60 minutes
const METADATA_REFRESH_INTERVAL_MINUTES = process.env.METADATA_REFRESH_INTERVAL_MINUTES;

// This array will hold ProjectBot classes for all the Factory Projects we find
const factoryBotList = [];

class FactoryBot {
  constructor() {
    this.initialize();
    setInterval(this.initialize, METADATA_REFRESH_INTERVAL_MINUTES * 60000);
  }

  async initialize() {
    const projectList = await getArtBlocksPlatform();

    for (let i = 0; i < projectList.length; i++) {
      const projectData = await getArtBlocksProject(projectList[i]);

      if (projectData && isFactoryProject(projectList[i])) {
        console.log(`Refreshing project cache for Project ${projectList[i]} ${projectData.name}`);
        const newBot = new ProjectBot({
          projectNumber: projectList[i],
          coreContract: projectConfig.coreContracts.V2,
          editionSize: projectData.invocations,
          projectName: projectData.name,
        });
        const nameIndex = projectData.name.toLowerCase().replace(/\s+/g, '');
        factoryBotList[nameIndex] = newBot;
      }
    }
  }

  async handleNumberMessage(msg) {
    const content = msg.content;

    if (content.length <= 1) {
      msg.channel.send(
          `Invalid format, enter # followed by the piece number of interest.`,
      );
      return;
    }

    const afterTheHash = content.substring(1);
    const nameIndex = content.substr(content.indexOf(' ')+1).toLowerCase().replace(/\s+/g, '');
    console.log(`Searching for project ${nameIndex}`);
    const projBot = factoryBotList[nameIndex];
    if (projBot) {
      projBot.handleNumberMessage(msg);
    }
  }
}

module.exports.FactoryBot = FactoryBot;
