require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const deburr = require("lodash.deburr");
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

class FactoryBot {
  constructor() {
    this.projects = {};
    this.initialize();
    setInterval(
      () => this.initialize(),
      METADATA_REFRESH_INTERVAL_MINUTES * 60000
    );
  }

  async initialize() {
    try {
      const factoryProjects = await getArtBlocksFactoryProjects();

      for (let i = 0; i < factoryProjects.length; i++) {
        const project = factoryProjects[i];
        console.log(
          `Refreshing project cache for Factory Project ${project.projectId} ${project.name}`
        );
        const newBot = new ProjectBot({
          projectNumber: project.projectId,
          coreContract: project.contract.id,
          editionSize: project.invocations,
          projectName: project.name,
        });
        const projectKey = this.toProjectKey(project.name);
        this.projects[projectKey] = newBot;
      }
    } catch (err) {
      console.error(`Error while initializing FactoryBots\n${err}`);
    }

    // for testing with FactoryBot.test.js
    // TODO: use a testing framework to handle this
    if (this.initializeCb) {
      this.initializeCb()
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
    const projectKey = this.toProjectKey(
      content.substr(content.indexOf(" ") + 1)
    );

    console.log(`Searching for project ${projectKey}`);
    const projBot = this.projects[projectKey];
    if (projBot) {
      projBot.handleNumberMessage(msg);
    }
  }

  toProjectKey(projectName) {
    let projectKey = deburr(projectName)
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "");

    // just in case there's a project name with no alphanumerical characters
    if (projectKey === "") {
      return deburr(projectName).toLowerCase().replace(/\s+/g, "");
    }

    return projectKey;
  }
}

module.exports.FactoryBot = FactoryBot;
