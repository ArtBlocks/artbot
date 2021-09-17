require('dotenv').config(); const {
  MessageEmbed,
} = require('discord.js');

const fetch = require('node-fetch');
const Web3 = require('web3');
const getArtBlocksPlatform = require('../Utils/parseArtBlocksAPI').getArtBlocksPlatform;
const getArtBlocksProject = require('../Utils/parseArtBlocksAPI').getArtBlocksProject;

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

const V2_MINTING_CONTRACT_ADDRESS = '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270';

// Refresh takes around one minute, so recommend setting this to 60 minutes
const METADATA_REFRESH_INTERVAL_MINUTES = process.env.METADATA_REFRESH_INTERVAL_MINUTES;

// This array will hold ProjectBot classes for all the Factory Projects we find
let projectCount = 0;

class RandomBot {
  constructor() {
    this.initialize();
    setInterval(this.initialize, METADATA_REFRESH_INTERVAL_MINUTES * 60000);
  }

  async initialize() {
    const projectList = await getArtBlocksPlatform();
    projectCount = projectList[projectList.length - 1];
    console.log(`Loading project count: ${projectCount}`);
  }

  async handleRandomMessage(msg) {
    const content = msg.content;

    if (content.length <= 1) {
      return;
    }

    const afterTheHash = content.substring(1);
    if (afterTheHash[0] != '?') {
      return;
    }

    let attempts = 0;
    while (attempts < 10) {
      const projectNumber = parseInt(Math.random() * projectCount);
      console.log(`trying to look for project ${projectNumber}`);
      const projectData = await getArtBlocksProject(projectNumber);
      if (projectData) {
        const pieceNumber = parseInt(Math.random() * projectData.invocations);
        const tokenID = (projectNumber * 1e6) + pieceNumber;
        const artBlocksResponse = await fetch(`https://api.artblocks.io/token/${tokenID}`, {timeout: 5000});
        const artBlocksData = await artBlocksResponse.json();

        const imageContent = new MessageEmbed()
        // Set the title of the field.
            .setTitle(artBlocksData.name)
        // Add link to OpenSea listing.
            .setURL(artBlocksData.external_url)
        // Set the full image for embed.
            .setImage(artBlocksData.image);
        msg.channel.send(imageContent);
        return;
      }
      attempts++;
    }
  }
}

module.exports.RandomBot = RandomBot;
