require("dotenv").config();
const {
  Client,
  MessageEmbed
} = require("discord.js");
const express = require("express");
const bodyParser = require("body-parser");
const OSTradeListener = require("./OSTradeListener").OSTradeListener;
const ProjectBot = require("./ProjectBot").ProjectBot;

// Misc. server configuration info.
const TOKEN = process.env.TOKEN;
const SERVER = process.env.SERVER;
const TIMER = process.env.TIMER;
const PORT = process.env.PORT || 3000;

// ArtBot username.
const ARTBOT_USERNAME = "artbot";
const ARTBOT_GREEN = 0x00ff00;

// General main Discord channel ID.
const CHANNEL_GENERAL = process.env.CHANNEL_GENERAL;

// Trade activity Discord channel IDs.
const CHANNEL_TRADE = process.env.CHANNEL_TRADE;
const CHANNEL_TRADE_PLAYGROUND = process.env.CHANNEL_TRADE_PLAYGROUND;

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

// Artist playground Discord channel IDs.
const CHANNEL_PLAYGROUND_JEFFDAVIS = process.env.CHANNEL_PLAYGROUND_JEFFDAVIS;
const CHANNEL_PLAYGROUND_DANDAN = process.env.CHANNEL_PLAYGROUND_DANDAN;
const CHANNEL_PLAYGROUND_PXLQ = process.env.CHANNEL_PLAYGROUND_PXLQ;
const CHANNEL_PLAYGROUND_DMITRICHERNIAK = process.env.CHANNEL_PLAYGROUND_DMITRICHERNIAK;
const CHANNEL_PLAYGROUND_GE1DOOT = process.env.CHANNEL_PLAYGROUND_GE1DOOT;
const CHANNEL_PLAYGROUND_KAI = process.env.CHANNEL_PLAYGROUND_KAI;

// Minting contract addresses.
const OG_MINTING_CONTRACT_ADDRESS = "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a";
const V2_MINTING_CONTRACT_ADDRESS = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

// Custom message shown when someone asks why Squiggle minting is paused.
const SQUIGGLE_PAUSE_MESSAGE = new MessageEmbed()
  // Set the title of the field
  .setTitle('Why is Squiggle minting paused?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(`It looks like you're wondering about why Chromie Squiggle minting is paused.The tl;dr is that all normal minting is over and the remaining Squiggles are reserved for special occasions!\n\nFor more details, check out the [#squiggle-announcements](https://discord.com/channels/411959613370400778/800461920008273962/800464186924466187) channel.`);

// Custom message shown when someone asks about when the next drop is.
const NEXT_DROP_MESSAGE = new MessageEmbed()
  // Set the title of the field
  .setTitle('When is the next drop?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(`It looks like you're wondering about when the next drop is.\n\nCheck for details on upcoming scheduled releases in the [#events](https://discord.com/channels/411959613370400778/800784659940245504) and [#announcements](https://discord.com/channels/411959613370400778/781730104337235968) channels.`);

// Custom message shown when someone asks what the "Factory" is.
const FACTORY_MESSAGE = new MessageEmbed()
  // Set the title of the field
  .setTitle('What is the ArtBlocks Factory?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(`It looks like you're wondering what the ArtBlocks Factory is.\n\nCheck out [this explaination from snowfro@](https://discord.com/channels/411959613370400778/411959613370400780/814171687133511720) :).`);

// Custom message shown when someone asks what the "Playground" vs. "Curated" is.
const PLAYGROUND_VS_CURATED_MESSAGE = new MessageEmbed()
  // Set the title of the field
  .setTitle('How are "Curated" and "Playground" different?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(`It looks like you're wondering about the difference between Curated Projects and the Artist Playground. Here is the tl;dr:\n\nArt Blocks as a platform has established a curation board to carefully select projects for inclusion in the "official" Art Blocks Curated Collection.\n\nArtists that have been included in the Curated Collection are then allowed to deploy a project of their choice in the Artist Playground. These projects are not "curated" and subsequently are not promoted as an official Art Blocks drop or considered to be part of the "official" Art Blocks collection.\n\nCheck out [artblocks.io/learn](https://artblocks.io/learn) for a full explanation!`);

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
// #kai projects
let pixelGlassBot = new ProjectBot(
  24000000,
  V2_MINTING_CONTRACT_ADDRESS,
  256,
  "Pixel Glass"
);

// Message event handler.
bot.on("message", (msg) => {
  let msgAuthor = msg.author.username;
  let msgContent = msg.content;
  let msgContentLowercase = msgContent.toLowerCase();
  let channelID = msg.channel.id;

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
        }
        break;
      case CHANNEL_PLAYGROUND_KAI:
        if (msgContentLowercase.includes("pixel") &&
          msgContentLowercase.includes("glass")) {
          pixelGlassBot.handleNumberMessage(msg);
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
  //
  // NOTE: It is important to check if the message author is the ArtBot
  //       itself to avoid a recursive infinite loop.
  if (msgAuthor !== ARTBOT_USERNAME) {
    // Some shared helper variables.
    let inGeneralChannel = (channelID == CHANNEL_GENERAL);
    let mentionedArtBot = msgContentLowercase.includes(ARTBOT_USERNAME) ||
      msgContentLowercase.includes(bot.user.id);
    let mentionedArtBotOrInGeneral = mentionedArtBot || inGeneralChannel;
    let containsQuestion = msgContentLowercase.includes("?");

    // Handle questions about the mint pausing for Chromie Squiggles.
    let inSquiggleChannel = (channelID == CHANNEL_SQUIG);
    // Both "pause" and "stopped" are keywords.
    let mentionsPause = msgContentLowercase.includes("pause") ||
      msgContentLowercase.includes("stopped");
    // Handle some common misspellings of "squiggle":
    // “squigle”, “squigglle”, “squiglle”
    let messageMentionsSquiggle = msgContentLowercase.includes("squiggle") ||
      msgContentLowercase.includes("squigle") ||
      msgContentLowercase.includes("squigglle") ||
      msgContentLowercase.includes("squiglle");
    let squiggleChannelPauseMentioned = mentionsPause && inSquiggleChannel;
    let generalChannelSquigglePauseMentioned = mentionsPause &&
      messageMentionsSquiggle &&
      mentionedArtBotOrInGeneral;
    if (squiggleChannelPauseMentioned || generalChannelSquigglePauseMentioned) {
      msg.channel.send(SQUIGGLE_PAUSE_MESSAGE);
      return;
    }

    // Only answer the following questions if ArtBlot is pinged directly
    // or the message was sent in #general.
    if (mentionedArtBotOrInGeneral) {
      // Handle drop questions by sending a link to #events
      let mentionsDrop = msgContentLowercase.includes("drop");
      if (containsQuestion && mentionsDrop) {
        msg.channel.send(NEXT_DROP_MESSAGE);
        return;
      }

      // Handle questions about factory by redirecting to:
      // https://discord.com/channels/411959613370400778/411959613370400780/814171687133511720
      let mentionsFactory = msgContentLowercase.includes("factory");
      if (containsQuestion && mentionsFactory) {
        msg.channel.send(FACTORY_MESSAGE);
        return;
      }

      // Handle questions about Curated Projects vs. Artist Playground.
      let mentionedCuratedOrPlayground = msgContentLowercase.includes("curated") ||
        msgContentLowercase.includes("playground");
      if (containsQuestion && mentionedCuratedOrPlayground) {
        msg.channel.send(PLAYGROUND_VS_CURATED_MESSAGE);
        return;
      }
    }
  }
});

// Trade activity channel Discord event handlers.
// Initialize and set up OpenSea event listener polling.
const pollInterval = TIMER * 1000;
let curatedActivityListener = new OSTradeListener(
  bot,
  CHANNEL_TRADE,
  "art-blocks",
  pollInterval
);
setInterval(
  () => {
    curatedActivityListener.pollTradeEvents();
  },
  pollInterval
);
let playgroundActivityListener = new OSTradeListener(
  bot,
  CHANNEL_TRADE_PLAYGROUND,
  "art-blocks-playground",
  pollInterval
);
setInterval(
  () => {
    playgroundActivityListener.pollTradeEvents();
  },
  pollInterval
);
