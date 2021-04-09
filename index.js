require("dotenv").config();
const {
  Client,
  MessageEmbed
} = require("discord.js");
const express = require("express");
const bodyParser = require("body-parser");

const AddressCollector = require("./AddressCollector").AddressCollector;
const OSTradeListener = require("./OSTradeListener").OSTradeListener;
const ProjectBot = require("./ProjectBot").ProjectBot;

// Special handlers.
const triageActivityMessage = require("./activityTriager").triageActivityMessage;
const smartBotResponse = require("./smartBotResponse").smartBotResponse;

// Per-channel handlers.
const ringerSinglesTransform = require("./ringerHandler").ringerSinglesTransform;
const ringerSetsTransform = require("./ringerHandler").ringerSetsTransform;
const apparitionSinglesTransform = require("./apparitionHandler").apparitionSinglesTransform;
const apparitionSetsTransform = require("./apparitionHandler").apparitionSetsTransform;

// Misc. server configuration info.
const TOKEN = process.env.TOKEN;
const SERVER = process.env.SERVER;
const TIMER = process.env.TIMER;
const PORT = process.env.PORT || 3000;

// Trade activity Discord channel IDs.
const PROD_CHANNEL_ACTIVITY_ALL = process.env.PROD_CHANNEL_ACTIVITY_ALL;

// Curated project Discord channel IDs.
const CHANNEL_SING = process.env.CHANNEL_SING;
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
const CHANNEL_SPECTRON = process.env.CHANNEL_SPECTRON;
const CHANNEL_CRYPTOBLOTS = process.env.CHANNEL_CRYPTOBLOTS;
const CHANNEL_ARCHETYPE = process.env.CHANNEL_ARCHETYPE;
const CHANNEL_720_MINUTES = process.env.CHANNEL_720_MINUTES;
const CHANNEL_APPARITIONS = process.env.CHANNEL_APPARITIONS;
const CHANNEL_INSPIRALS = process.env.CHANNEL_INSPIRALS;
const CHANNEL_AERIAL_VIEW = process.env.CHANNEL_AERIAL_VIEW;
const CHANNEL_SYNAPSES = process.env.CHANNEL_SYNAPSES;

// Artist playground Discord channel IDs.
const CHANNEL_PLAYGROUND_JEFFDAVIS = process.env.CHANNEL_PLAYGROUND_JEFFDAVIS;
const CHANNEL_PLAYGROUND_DANDAN = process.env.CHANNEL_PLAYGROUND_DANDAN;
const CHANNEL_PLAYGROUND_PXLQ = process.env.CHANNEL_PLAYGROUND_PXLQ;
const CHANNEL_PLAYGROUND_DMITRICHERNIAK = process.env.CHANNEL_PLAYGROUND_DMITRICHERNIAK;
const CHANNEL_PLAYGROUND_GE1DOOT = process.env.CHANNEL_PLAYGROUND_GE1DOOT;
const CHANNEL_PLAYGROUND_KAI = process.env.CHANNEL_PLAYGROUND_KAI;
const CHANNEL_PLAYGROUND_BEERVANGEER = process.env.CHANNEL_PLAYGROUND_BEERVANGEER;
const CHANNEL_PLAYGROUND_LUXPRIS = process.env.CHANNEL_PLAYGROUND_LUXPRIS;
const CHANNEL_PLAYGROUND_GOLID = process.env.CHANNEL_PLAYGROUND_GOLID;

// Special address collection channel.
const CHANNEL_ADDRESS_COLLECTION = process.env.CHANNEL_ADDRESS_COLLECTION;

// Minting contract addresses.
const OG_MINTING_CONTRACT_ADDRESS = "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a";
const V2_MINTING_CONTRACT_ADDRESS = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

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
let spectronBot = new ProjectBot(
  17000000,
  V2_MINTING_CONTRACT_ADDRESS,
  400,
  "Spectron"
);
let cryptoblotBot = new ProjectBot(
  3000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1921,
  "Cryptoblots"
);
let archetypeBot = new ProjectBot(
  23000000,
  V2_MINTING_CONTRACT_ADDRESS,
  600,
  "Archetype"
);
let minutesBot = new ProjectBot(
  27000000,
  V2_MINTING_CONTRACT_ADDRESS,
  720,
  "720 Minutes"
);
let apparitionsBot = new ProjectBot(
  28000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1500,
  "Apparitions"
);
let inspiralsBot = new ProjectBot(
  29000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1000,
  "Inspirals"
);
let aerialViewBot = new ProjectBot(
  35000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1000,
  "Aerial View"
);
let synapsesBot = new ProjectBot(
  39000000,
  V2_MINTING_CONTRACT_ADDRESS,
  700,
  "Synapses"
);

// Artist playground project Discord channel message handlers.
// #jeff-davis projects
let viewCardBot = new ProjectBot(
  6000000,
  V2_MINTING_CONTRACT_ADDRESS,
  41,
  "View Card"
);
let colorStudyBot = new ProjectBot(
  16000000,
  V2_MINTING_CONTRACT_ADDRESS,
  2000,
  "Color Study"
);
// #dandan projects
let gen2Bot = new ProjectBot(
  18000000,
  V2_MINTING_CONTRACT_ADDRESS,
  256,
  "Gen 2"
);
// #pxlq projects
let sentienceBot = new ProjectBot(
  20000000,
  V2_MINTING_CONTRACT_ADDRESS,
  144,
  "Sentience"
);
let cyberCitiesBot = new ProjectBot(
  14000000,
  V2_MINTING_CONTRACT_ADDRESS,
  256,
  "Cyber Cities"
);
let hieroglyphsBot = new ProjectBot(
  30000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1250,
  "Hieroglyphs"
);
// #dmitri-cherniak projects
let eternalPumpBot = new ProjectBot(
  22000000,
  V2_MINTING_CONTRACT_ADDRESS,
  50,
  "The Eternal Pump"
);
// #ge1doot projects
let utopiaBot = new ProjectBot(
  15000000,
  V2_MINTING_CONTRACT_ADDRESS,
  256,
  "Utopia"
);
let r3sonanceBot = new ProjectBot(
  19000000,
  V2_MINTING_CONTRACT_ADDRESS,
  512,
  "R3sonance"
);
// #kai projects
let pixelGlassBot = new ProjectBot(
  24000000,
  V2_MINTING_CONTRACT_ADDRESS,
  256,
  "Pixel Glass"
);
// #beervangeer projects
let energySculptureBot = new ProjectBot(
  26000000,
  V2_MINTING_CONTRACT_ADDRESS,
  369,
  "EnergySculpture"
);
// #luxpris projects
let pathfindersBot = new ProjectBot(
  25000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1000,
  "Pathfinders"
);
// #kjetil-golid projects
let paperArmadaBot = new ProjectBot(
  37000000,
  V2_MINTING_CONTRACT_ADDRESS,
  3000,
  "Paper Armada"
);

// Special address collector.
let addressCollector = new AddressCollector();

// Message event handler.
bot.on("message", (msg) => {
  let msgAuthor = msg.author.username;
  let msgContent = msg.content;
  let msgContentLowercase = msgContent.toLowerCase();
  let channelID = msg.channel.id;

  // If the message is in the activity channel, forward the message on
  // to the appropriate sub-channel.
  if (channelID == PROD_CHANNEL_ACTIVITY_ALL) {
    triageActivityMessage(msg, bot);
    return;
  }

  // If message is in special address collection channel, forward message
  // to that handler and return early.
  if (channelID == CHANNEL_ADDRESS_COLLECTION) {
    addressCollector.addressCollectionHandler(msg);
    return;
  }

  // Handle piece # requests.
  if (msgContent.startsWith("#")) {
    switch (channelID) {
      // Curated project channels.
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
        let ringerSinglesTransformedValue = ringerSinglesTransform(msg.content);
        let ringerSetsTransformedValue = ringerSetsTransform(msg.content);
        if (ringerSinglesTransformedValue !== null) {
          msg.content = ringerSinglesTransformedValue;
        } else
        if (ringerSetsTransformedValue !== null) {
          msg.content = ringerSetsTransformedValue;
        }
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
      case CHANNEL_SPECTRON:
        spectronBot.handleNumberMessage(msg);
        break;
      case CHANNEL_CRYPTOBLOTS:
        cryptoblotBot.handleNumberMessage(msg);
        break;
      case CHANNEL_ARCHETYPE:
        archetypeBot.handleNumberMessage(msg);
        break;
      case CHANNEL_720_MINUTES:
        minutesBot.handleNumberMessage(msg);
        break;
      case CHANNEL_APPARITIONS:
        let apparitionSinglesTransformedValue =
          apparitionSinglesTransform(msg.content);
        let apparitionSetsTransformedValue =
          apparitionSetsTransform(msg.content);
        if (apparitionSinglesTransformedValue !== null) {
          msg.content = apparitionSinglesTransformedValue;
        } else
        if (apparitionSetsTransformedValue !== null) {
          msg.content = apparitionSetsTransformedValue;
        }
        apparitionsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_INSPIRALS:
        inspiralsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_AERIAL_VIEW:
        aerialViewBot.handleNumberMessage(msg);
        break;
      case CHANNEL_SYNAPSES:
        synapsesBot.handleNumberMessage(msg);
        break;

        // Artist playground channels.
      case CHANNEL_PLAYGROUND_JEFFDAVIS:
        if (msgContentLowercase.includes("color") &&
          msgContentLowercase.includes("study")) {
          colorStudyBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("view") &&
          msgContentLowercase.includes("card")) {
          viewCardBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_PLAYGROUND_DANDAN:
        if (msgContentLowercase.includes("gen2") ||
          msgContentLowercase.includes("gen 2")) {
          gen2Bot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_PLAYGROUND_PXLQ:
        if (msgContentLowercase.includes("cyber") &&
          msgContentLowercase.includes("cities")) {
          cyberCitiesBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("sentience")) {
          sentienceBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("hieroglyphs")) {
          hieroglyphsBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_PLAYGROUND_DMITRICHERNIAK:
        if (msgContentLowercase.includes("eternal") &&
          msgContentLowercase.includes("pump")) {
          eternalPumpBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_PLAYGROUND_GE1DOOT:
        if (msgContentLowercase.includes("utopia")) {
          utopiaBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("r3")) {
          r3sonanceBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_PLAYGROUND_KAI:
        if (msgContentLowercase.includes("pixel") &&
          msgContentLowercase.includes("glass")) {
          pixelGlassBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_PLAYGROUND_BEERVANGEER:
        if (msgContentLowercase.includes("energy") &&
          msgContentLowercase.includes("sculpture")) {
          energySculptureBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_PLAYGROUND_LUXPRIS:
        if (msgContentLowercase.includes("pathfinder")) {
          pathfindersBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_PLAYGROUND_GOLID:
        if (msgContentLowercase.includes("armada")) {
          paperArmadaBot.handleNumberMessage(msg);
        }
        break;

      // Fall-back (should never occur).
      default:
        console.log(`Unknown channel ID: ${msg.channel.id}`);
        break;
    }
    return;
  }

  // Handle special info questions that ArtBot knows how to answer.
  let artBotID = bot.user.id;
  smartBotResponse(msgContentLowercase, msgAuthor, artBotID, channelID).then(
    (smartResponse) => {
      if (smartResponse !== null) {
        msg.reply(null, {
          embed: smartResponse,
          allowedMentions: {
            repliedUser: true
          }
        });
      }
    }
  );
});
