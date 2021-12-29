require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Web3 = require("web3");
const getArtBlocksFactoryProjects =
  require("../Utils/parseArtBlocksAPI").getArtBlocksFactoryProjects;
const ProjectBot = require("./ProjectBot").ProjectBot;
const projectConfig = require("../ProjectConfig/projectConfig").projectConfig;

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// Refresh takes around one minute, so recommend setting this to 60 minutes
const METADATA_REFRESH_INTERVAL_MINUTES =
  process.env.METADATA_REFRESH_INTERVAL_MINUTES;

// This array will hold ProjectBot classes for all the Factory Projects we find
const factoryBotList = [];

class FactoryBot {
  constructor() {
    this.initialize();
    setInterval(this.initialize, METADATA_REFRESH_INTERVAL_MINUTES * 60000);
  }

  async initialize() {
    try {
      const factoryProjects = await getArtBlocksFactoryProjects();

      for (let i = 0; i < factoryProjects.length; i++) {
        const project = factoryProjects[i];
        console.log(
          `Refreshing project cache for Project ${project.projectId} ${project.name}`
        );
        const newBot = new ProjectBot({
          projectNumber: project.projectId,
          coreContract: project.contract.id,
          editionSize: project.invocations,
          projectName: project.name,
        });
        const nameIndex = project.name.toLowerCase().replace(/\s+/g, "");
        factoryBotList[nameIndex] = newBot;
      }
    } catch (err) {
      console.error(`Error while initializing FactoryBots\n${err}`);
    }
  }

  async handleNumberMessage(msg) {
    const content = msg.content;

    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      );
      return;
    }

    const afterTheHash = content.substring(1);
    const nameIndex = content
      .substr(content.indexOf(" ") + 1)
      .toLowerCase()
      .replace(/\s+/g, "");
    console.log(`Searching for project ${nameIndex}`);
    const projBot = factoryBotList[nameIndex];
    if (projBot) {
      projBot.handleNumberMessage(msg);
    }
  }
}

module.exports.FactoryBot = FactoryBot;
