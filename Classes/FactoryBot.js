require("dotenv").config();
const {
  MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");
const Web3 = require("web3");
const getArtBlocksPlatform = require("../Utils/parseArtBlocksAPI").getArtBlocksPlatform;
const getArtBlocksProject = require("../Utils/parseArtBlocksAPI").getArtBlocksProject;
const isFactoryProject = require("../Utils/parseArtBlocksAPI").isFactoryProject;
const ProjectBot = require("./ProjectBot").ProjectBot;

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const MINT_ADDRESS = "0x0000000000000000000000000000000000000000";
const V2_MINTING_CONTRACT_ADDRESS = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";
const EMBED_COLOR = 0xff0000;
const UNKNOWN_ADDRESS = "unknown";
const UNKNOWN_USERNAME = "unknown";
const METADATA_REFRESH = process.env.METADATA_REFRESH_INTERVAL_MINUTES;


let factoryBotList = [];

class FactoryBot {
  constructor(projectNumber, mintContract, editionNumber, projectName) {
    this.initialize();
    setInterval(this.initialize, METADATA_REFRESH * 60000);
  }

  async initialize() {

    let projectList = await getArtBlocksPlatform();

    for (let i = 0; i < projectList.length; i++) {
       let projectData = await getArtBlocksProject(projectList[i]); 

       console.log(`Refreshing project cache for Project ${projectList[i]} ${projectData.name}`);
       if (isFactoryProject(projectList[i])) {
           let newBot = new ProjectBot(
                   projectList[i]*1000000,
                   V2_MINTING_CONTRACT_ADDRESS,
                   projectData.invocations,
                   projectData.name
                   );
           let nameIndex = projectData.name.toLowerCase().replace(/\s+/g, '');
           factoryBotList[nameIndex] = newBot;
       }

    }

  }
 
  async handleNumberMessage(msg) {

    console.log(msg.content);
    let content = msg.content;

    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      );
      return;
    }

    let detailsRequested = content.toLowerCase().includes("detail");
    let afterTheHash = content.substring(1);
    let nameIndex = content.substr(content.indexOf(" ")+1).toLowerCase().replace(/\s+/g, '');
    console.log(nameIndex);
    if (factoryBotList[nameIndex]) {
       console.log(factoryBotList[nameIndex]);
       factoryBotList[nameIndex].handleNumberMessage(msg);
    }
  }

}

module.exports.FactoryBot = FactoryBot;
