require("dotenv").config();
const {
  Client,
  MessageEmbed
} = require("discord.js");
const express = require("express");
const bodyParser = require("body-parser");
const os = require("./osEvent");
const ProjectBot = require("./ProjectBot").ProjectBot;

// Misc. server configuration info.
const TOKEN = process.env.TOKEN;
const SERVER = process.env.SERVER;
const PORT = process.env.PORT || 3000;

// Curated project Discord channel IDs.
const CHANNEL_SING = process.env.CHANNEL_SING;
const CHANNEL_TRADE = process.env.CHANNEL_TRADE;
const CHANNEL_IGNITION = process.env.CHANNEL_IGNITION;
const CHANNEL_SQUIG = process.env.CHANNEL_SQUIG;
const CHANNEL_RINGERS = process.env.CHANNEL_RINGERS;
const CHANNEL_GENESIS = process.env.CHANNEL_GENESIS;
const CHANNEL_CONSTRUCTION = process.env.CHANNEL_CONSTRUCTION;
const CHANNEL_DYNAMIC_SLICES = process.env.CHANNEL_DYNAMIC_SLICES;
const CHANNEL_DECONSTRUCTIONS = process.env.CHANNEL_DECONSTRUCTIONS;
const CHANNEL_NIMBUDS = process.env.CHANNEL_NIMBUDS;
const CHANNEL_HYPERHASH = process.env.CHANNEL_HYPERHASH;
const CHANNEL_UNIGRIDS = process.env.CHANNEL_UNIGRIDS;
const CHANNEL_27_BIT = process.env.CHANNEL_27_BIT;
const CHANNEL_CRYPTOBLOTS = process.env.CHANNEL_CRYPTOBLOTS;

// Minting contract addresses.
const OG_MINTING_CONTRACT_ADDRESS = "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a";
const V2_MINTING_CONTRACT_ADDRESS = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

// Custom message shown when someone asks why Squiggle minting is paused.
const SQUIGGLE_PAUSE_MESSAGE = new MessageEmbed()
      // Set the title of the field
      .setTitle('Why is minting paused?')
      // Set the color of the embed
      .setColor(0x00ff00)
      // Set the main content of the embed
      .setDescription(`It looks like you're wondering about why Chromie Squiggle minting is paused.The tl;dr is that all normal minting is over and the remaining Squiggles are reserved for special occasions!\n\nFor more details, check out the [#squiggle-announcements](https://discord.com/channels/411959613370400778/800461920008273962/800464186924466187) channel.`);

// App setup.
const app = express();

app.use(bodyParser.json());

app.post("/update", function(req, res) {
  console.log("received update with body:\n", JSON.stringify(req.body, null, 2), "\n");

  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true
  });
});

app.get("/update", function(req, res) {
  console.log("received get with body:\n", req.body, "\n");

  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true
  });
});

app.listen(PORT, function() {
  console.log("Server is listening on port ", PORT);
});

// Bot setup.
const bot = new Client();

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

// Curated project Discord channel message handlers.
let singularityBot = new ProjectBot(
  8000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1024,
  "Singularity"
);
let ignitionBot = new ProjectBot(
  9000000,
  V2_MINTING_CONTRACT_ADDRESS,
  512,
  "Ignition"
);
let squiggleBot = new ProjectBot(
  0,
  OG_MINTING_CONTRACT_ADDRESS,
  10000,
  "Chromie Squiggle"
);
let ringersBot = new ProjectBot(
  13000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1000,
  "Ringers"
);
let genesisBot = new ProjectBot(
  1000000,
  OG_MINTING_CONTRACT_ADDRESS,
  512,
  "Genesis"
);
let constructionBot = new ProjectBot(
  2000000,
  OG_MINTING_CONTRACT_ADDRESS,
  500,
  "Construction Token"
);
let dynamicSlicesBot = new ProjectBot(
  4000000,
  V2_MINTING_CONTRACT_ADDRESS,
  512,
  "Dynamic Slices"
);
let deconstructionsBot = new ProjectBot(
  7000000,
  V2_MINTING_CONTRACT_ADDRESS,
  200,
  "Elevated Deconstructions"
);
let nimbudsBot = new ProjectBot(
  10000000,
  V2_MINTING_CONTRACT_ADDRESS,
  400,
  "Nimbuds"
);
let hyperhashBot = new ProjectBot(
  11000000,
  V2_MINTING_CONTRACT_ADDRESS,
  369,
  "HyperHash"
);
let unigridsBot = new ProjectBot(
  12000000,
  V2_MINTING_CONTRACT_ADDRESS,
  421,
  "Unigrids"
);
let bitBot = new ProjectBot(
  21000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1024,
  "27-Bit Digital"
);
let cryptoblotBot = new ProjectBot(
  3000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1921,
  "Cryptoblots"
);

// Message event handler.
bot.on("message", (msg) => {
  // Handle piece # requests.
  if (msg.content.startsWith("#")) {
    switch (msg.channel.id) {
      case CHANNEL_SING:
        singularityBot.handleNumberMessage(msg);
        break;
      case CHANNEL_IGNITION:
        ignitionBot.handleNumberMessage(msg);
        break;
      case CHANNEL_SQUIG:
        squiggleBot.handleNumberMessage(msg);
        break;
      case CHANNEL_RINGERS:
        ringersBot.handleNumberMessage(msg);
        break;
      case CHANNEL_GENESIS:
        genesisBot.handleNumberMessage(msg);
        break;
      case CHANNEL_CONSTRUCTION:
        constructionBot.handleNumberMessage(msg);
        break;
      case CHANNEL_DYNAMIC_SLICES:
        dynamicSlicesBot.handleNumberMessage(msg);
        break;
      case CHANNEL_DECONSTRUCTIONS:
        deconstructionsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_NIMBUDS:
        nimbudsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_HYPERHASH:
        hyperhashBot.handleNumberMessage(msg);
        break;
      case CHANNEL_UNIGRIDS:
        unigridsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_27_BIT:
        bitBot.handleNumberMessage(msg);
        break;
      case CHANNEL_CRYPTOBLOTS:
        cryptoblotBot.handleNumberMessage(msg);
        break;
      default:
        console.log(`Unknown channel ID: ${msg.channel.id}`);
        break;
    }
    return;
  }

  // Handle questions about the mint pausing for Chromie Squiggles.
  //
  // NOTE: It is important to check if the message author is the ArtBot
  //       itself to avoid a recursive infinite loop.
  if (msg.content.toLowerCase().includes("pause")
             && msg.channel.id == CHANNEL_SQUIG
             && msg.author.username !== "artbot") {
    msg.channel.send(SQUIGGLE_PAUSE_MESSAGE);
  }
});

// Set up OpenSea event listener polling.
// TODO(jakerockland@): Replace with webhook implementation.
setInterval(os.openseaEvent, 60 * 1000, bot);
