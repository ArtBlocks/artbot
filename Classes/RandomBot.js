require("dotenv").config();
const { MessageEmbed } = require("discord.js");

const fetch = require("node-fetch");
const Web3 = require("web3");
const getArtBlocksProject =
  require("../Utils/parseArtBlocksAPI").getArtBlocksProject;
const getArtBlocksProjectCount =
  require("../Utils/parseArtBlocksAPI").getArtBlocksProjectCount;

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// Refresh takes around one minute, so recommend setting this to 60 minutes
const METADATA_REFRESH_INTERVAL_MINUTES =
  process.env.METADATA_REFRESH_INTERVAL_MINUTES;
const RANDOM_ART_INTERVAL_MINUTES = process.env.RANDOM_ART_INTERVAL_MINUTES;

// This array will hold ProjectBot classes for all the Factory Projects we find
let projectCount = 0;

class RandomBot {
  constructor() {
    this.initialize();
    setInterval(this.initialize, METADATA_REFRESH_INTERVAL_MINUTES * 60000);
  }

  async startRoutine(channel) {
    setInterval(() => this.sendRandomTokenMessage(channel), RANDOM_ART_INTERVAL_MINUTES * 60000);
  }

  async initialize() {
    const projectCountUpdated = await getArtBlocksProjectCount();
    if (projectCountUpdated === undefined) {
      console.error(
        `Error while fetching project counts, maintaining project count: ${projectCount}`
      );
      return;
    }
    projectCount = projectCountUpdated;
    console.log(`Loading project count: ${projectCount}`);
  }

  async handleRandomMessage(msg) {
    const content = msg.content;

    if (content.length <= 1) {
      return;
    }

    const afterTheHash = content.substring(1);
    if (afterTheHash[0] != "?") {
      return;
    }

    this.sendRandomTokenMessage(msg.channel);
  }

  // This function takes a channel and sends a message containing a random
  // token from a random project
  async sendRandomTokenMessage(channel) {
    let attempts = 0;
    while (attempts < 10) {
      const projectNumber = Math.floor(Math.random() * projectCount);
      console.log(`trying to look for project ${projectNumber}`);
      const projectData = await getArtBlocksProject(projectNumber);
      if (projectData && projectData.invocations > 0) {
        const pieceNumber = Math.floor(Math.random() * projectData.invocations);
        const tokenID = projectNumber * 1e6 + pieceNumber;
        const artBlocksResponse = await fetch(
          `https://token.artblocks.io/${tokenID}`,
          { timeout: 5000 }
        );
        const artBlocksData = await artBlocksResponse.json();

        const imageContent = new MessageEmbed()
          // Set the title of the field.
          .setTitle(artBlocksData.name)
          // Add link to OpenSea listing.
          .setURL(artBlocksData.external_url)
          // Set the full image for embed.
          .setImage(artBlocksData.image);
        channel.send(imageContent);
        return;
      }
      attempts++;
    }
  }
}

module.exports.RandomBot = RandomBot;
