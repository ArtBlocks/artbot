require("dotenv").config();
const {
  Client,
  MessageEmbed
} = require("discord.js");
const { GiveawaysManager } = require('discord-giveaways');
const express = require("express");
const bodyParser = require("body-parser");

const AddressCollector = require("./Classes/AddressCollector").AddressCollector;
const ProjectBot = require("./Classes/ProjectBot").ProjectBot;
const ProjectHandlerHelper = require("./Classes/ProjectHandlerHelper").ProjectHandlerHelper;

// Special handlers.
const triageActivityMessage = require("./Utils/activityTriager").triageActivityMessage;
const smartBotResponse = require("./Utils/smartBotResponse").smartBotResponse;
const handleGiveawayMessage = require("./Utils/giveawayCommands").handleGiveawayMessage;

// Misc. server configuration info.
const TOKEN = process.env.TOKEN;
const SERVER = process.env.SERVER;
const PORT = process.env.PORT || 3000;

// Trade activity Discord channel IDs.
const PROD_CHANNEL_ACTIVITY_ALL = process.env.PROD_CHANNEL_ACTIVITY_ALL;

// Special Squiggle DAO honorary channel ID.
const CHANNEL_SQUIGGLE_DAO_SQUIGGLE_SQUARE = process.env.CHANNEL_SQUIGGLE_DAO_SQUIGGLE_SQUARE;

// Curated artist Discord channel IDs.
const CHANNEL_AARON_PENNE = process.env.CHANNEL_AARON_PENNE;
const CHANNEL_ALEXIS_ANDRE = process.env.CHANNEL_ALEXIS_ANDRE;
const CHANNEL_BEERVANGEER = process.env.CHANNEL_BEERVANGEER;
const CHANNEL_BRYAN_BRINKMAN = process.env.CHANNEL_BRYAN_BRINKMAN;
const CHANNEL_CHAOSCONSTRUCT = process.env.CHANNEL_CHAOSCONSTRUCT;
const CHANNEL_DAIM = process.env.CHANNEL_DAIM;
const CHANNEL_DALENZ = process.env.CHANNEL_DALENZ;
const CHANNEL_DANDAN = process.env.CHANNEL_DANDAN;
const CHANNEL_DMITRI_CHERNIAK = process.env.CHANNEL_DMITRI_CHERNIAK;
const CHANNEL_GE1DOOT = process.env.CHANNEL_GE1DOOT;
const CHANNEL_HAN_X_NICOLAS_DANIEL = process.env.CHANNEL_HAN_X_NICOLAS_DANIEL;
const CHANNEL_HIDEKI = process.env.CHANNEL_HIDEKI;
const CHANNEL_JASON_TING = process.env.CHANNEL_JASON_TING;
const CHANNEL_JEFF_DAVIS = process.env.CHANNEL_JEFF_DAVIS;
const CHANNEL_JOSHUA_BAGLEY = process.env.CHANNEL_JOSHUA_BAGLEY;
const CHANNEL_KAI = process.env.CHANNEL_KAI;
const CHANNEL_GOLID = process.env.CHANNEL_GOLID;
const CHANNEL_LUXPRIS = process.env.CHANNEL_LUXPRIS;
const CHANNEL_MATT_DESL = process.env.CHANNEL_MATT_DESL;
const CHANNEL_MICHAEL_CONNOLLY = process.env.CHANNEL_MICHAEL_CONNOLLY;
const CHANNEL_NUMBERSINMOTION = process.env.CHANNEL_NUMBERSINMOTION;
const CHANNEL_PXLQ = process.env.CHANNEL_PXLQ;
const CHANNEL_RADIX = process.env.CHANNEL_RADIX;
const CHANNEL_REAS = process.env.CHANNEL_REAS;
const CHANNEL_SIMON_DE_MAI = process.env.CHANNEL_SIMON_DE_MAI;
const CHANNEL_SHVEMBLDR = process.env.CHANNEL_SHVEMBLDR;
const CHANNEL_SNOWFRO = process.env.CHANNEL_SNOWFRO;
const CHANNEL_STEFAN_CONTIERO = process.env.CHANNEL_STEFAN_CONTIERO;
const CHANNEL_STINA_JONES = process.env.CHANNEL_STINA_JONES;
const CHANNEL_TYLER_HOBBS = process.env.CHANNEL_TYLER_HOBBS;
const CHANNEL_ZEBLOCKS = process.env.CHANNEL_ZEBLOCKS;

// Mints channel, for giveaways.
const CHANNEL_MINTS = process.env.CHANNEL_MINTS;

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

//Manage Giveaways with Artbot
bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
bot.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});
bot.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});
bot.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
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
let algobotsBot = new ProjectBot(
  40000000,
  V2_MINTING_CONTRACT_ADDRESS,
  500,
  "Algobots"
);
let elementalsBot = new ProjectBot(
  41000000,
  V2_MINTING_CONTRACT_ADDRESS,
  600,
  "Elementals"
);
let subscapesBot = new ProjectBot(
  53000000,
  V2_MINTING_CONTRACT_ADDRESS,
  650,
  "Subscapes"
);
let numbersInMotionBot = new ProjectBot(
  59000000,
  V2_MINTING_CONTRACT_ADDRESS,
  600,
  "Watercolor Dreams"
);
let bubbleBlobbyBot = new ProjectBot(
  62000000,
  V2_MINTING_CONTRACT_ADDRESS,
  500,
  "Bubble Blobby"
);
let algoRhythmsBot = new ProjectBot(
  64000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1000,
  "AlgoRhythms"
);
let frammentiBot = new ProjectBot(
  72000000,
  V2_MINTING_CONTRACT_ADDRESS,
  555,
  "Frammenti"
);
let blocksOfArtBot = new ProjectBot(
  74000000,
  V2_MINTING_CONTRACT_ADDRESS,
  500,
  "The Blocks of Art"
);
let fidenzaBot = new ProjectBot(
  78000000,
  V2_MINTING_CONTRACT_ADDRESS,
  999,
  "Fidenza"
);
let dreamsBot = new ProjectBot(
  89000000,
  V2_MINTING_CONTRACT_ADDRESS,
  700,
  "Dreams"
);
let centuryBot = new ProjectBot(
  100000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1000,
  "Century"
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
let rhythmBot = new ProjectBot(
  57000000,
  V2_MINTING_CONTRACT_ADDRESS,
  400,
  "Rhythm"
);

// #dandan projects
let gen2Bot = new ProjectBot(
  18000000,
  V2_MINTING_CONTRACT_ADDRESS,
  256,
  "Gen 2"
);
let gen3Bot = new ProjectBot(
  48000000,
  V2_MINTING_CONTRACT_ADDRESS,
  1024,
  "Gen 3"
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
// #alexis-andrew projects
let voidBot =  new ProjectBot(
  42000000,
  V2_MINTING_CONTRACT_ADDRESS,
  500,
  "Void"
);
let messengersBot =  new ProjectBot(
  68000000,
  V2_MINTING_CONTRACT_ADDRESS,
  350,
  "Messengers"
);
// #aaron-penne projects
let returnBot =  new ProjectBot(
  77000000,
  V2_MINTING_CONTRACT_ADDRESS,
  300,
  "Return"
);
// #michael-connolly projects
let divisionsBot = new ProjectBot(
  108000000,
  V2_MINTING_CONTRACT_ADDRESS,
  500,
  "Divisions"
);

// Per-channel handlers.
const apparitionSingles = require("./NamedMappings/apparitionSingles.json");
const apparitionSets = require("./NamedMappings/apparitionSets.json");
let apparitionHandlerHelper = new ProjectHandlerHelper(
  apparitionSingles,
  apparitionSets
);
const ringerSingles = require("./NamedMappings/ringerSingles.json");
const ringerSets = require("./NamedMappings/ringerSets.json");
let ringerHandlerHelper = new ProjectHandlerHelper(
  ringerSingles,
  ringerSets
);
const subscapeSingles = require("./NamedMappings/subscapeSingles.json");
const subscapeSets = require("./NamedMappings/subscapeSets.json");
let subscapeHandlerHelper = new ProjectHandlerHelper(
  subscapeSingles,
  subscapeSets
);
const watercolorDreamSingles = require("./NamedMappings/watercolorDreamSingles.json");
const watercolorDreamSets = require("./NamedMappings/watercolorDreamSets.json");
let watercolorDreamHandlerHelper = new ProjectHandlerHelper(
  watercolorDreamSingles,
  watercolorDreamSets
);
const dreamSingles = require("./NamedMappings/dreamSingles.json");
const dreamSets = require("./NamedMappings/dreamSets.json");
let dreamHandlerHelper = new ProjectHandlerHelper(
  dreamSingles,
  dreamSets
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

  if (channelID == CHANNEL_MINTS) {
    if (msgContentLowercase.includes("giveaway!")) {
      console.log("Time for a giveaway");
      handleGiveawayMessage(msg, bot);
    }
  }

  // Handle piece # requests.
  if (msgContent.startsWith("#")) {
    switch (channelID) {
      // Curated project channels.
      case CHANNEL_HIDEKI:
        singularityBot.handleNumberMessage(msg);
        break;
      case CHANNEL_GE1DOOT:
        if (msgContentLowercase.includes("utopia")) {
          utopiaBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("r3")) {
          r3sonanceBot.handleNumberMessage(msg);
        } else {
          ignitionBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_SNOWFRO:
      case CHANNEL_SQUIGGLE_DAO_SQUIGGLE_SQUARE:
        squiggleBot.handleNumberMessage(msg);
        break;
      case CHANNEL_DMITRI_CHERNIAK:
        if (msgContentLowercase.includes("eternal") ||
          msgContentLowercase.includes("pump")) {
          eternalPumpBot.handleNumberMessage(msg);
        } else {
          let ringerSinglesTransformedValue =
            ringerHandlerHelper.singlesTransform(msg.content);
          let ringerSetsTransformedValue =
            ringerHandlerHelper.setsTransform(msg.content);
          if (ringerSinglesTransformedValue !== null) {
            msg.content = ringerSinglesTransformedValue;
          } else
          if (ringerSetsTransformedValue !== null) {
            msg.content = ringerSetsTransformedValue;
          }
          ringersBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_DANDAN:
        if (msgContentLowercase.includes("gen2") ||
          msgContentLowercase.includes("gen 2")) {
          gen2Bot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("gen3") ||
          msgContentLowercase.includes("gen 3")) {
          gen3Bot.handleNumberMessage(msg);
        } else {
          genesisBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_JEFF_DAVIS:
        if (msgContentLowercase.includes("rhythm")) {
          rhythmBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("color") &&
          msgContentLowercase.includes("study")) {
          colorStudyBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("view") &&
          msgContentLowercase.includes("card")) {
          viewCardBot.handleNumberMessage(msg);
        } else {
          constructionBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_JOSHUA_BAGLEY:
          let dreamSinglesTransformedValue =
            dreamHandlerHelper.singlesTransform(msg.content);
          let dreamSetsTransformedValue =
            dreamHandlerHelper.setsTransform(msg.content);
          if (dreamSinglesTransformedValue !== null) {
            msg.content = dreamSinglesTransformedValue;
          } else
          if (dreamSetsTransformedValue !== null) {
            msg.content = dreamSetsTransformedValue;
          }
          dreamsBot.handleNumberMessage(msg);
          break;
      case CHANNEL_PXLQ:
        if (msgContentLowercase.includes("cyber") &&
          msgContentLowercase.includes("cities")) {
          cyberCitiesBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("sentience")) {
          sentienceBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes("hieroglyphs")) {
          hieroglyphsBot.handleNumberMessage(msg);
        } else {
          dynamicSlicesBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_LUXPRIS:
        if (msgContentLowercase.includes("pathfinder")) {
          pathfindersBot.handleNumberMessage(msg);
        } else {
          deconstructionsBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_BRYAN_BRINKMAN:
        nimbudsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_BEERVANGEER:
        if (msgContentLowercase.includes("energy") &&
          msgContentLowercase.includes("sculpture")) {
          energySculptureBot.handleNumberMessage(msg);
        } else {
          hyperhashBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_ZEBLOCKS:
        unigridsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_KAI:
        if (msgContentLowercase.includes("pixel") &&
          msgContentLowercase.includes("glass")) {
          pixelGlassBot.handleNumberMessage(msg);
        } else {
          bitBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_SIMON_DE_MAI:
        spectronBot.handleNumberMessage(msg);
        break;
      case CHANNEL_DAIM:
        cryptoblotBot.handleNumberMessage(msg);
        break;
      case CHANNEL_GOLID:
        if (msgContentLowercase.includes("armada")) {
          paperArmadaBot.handleNumberMessage(msg);
        } else {
          archetypeBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_ALEXIS_ANDRE:
        if (msgContentLowercase.includes("void")) {
          voidBot.handleNumberMessage(msg);
        } else
        if (msgContentLowercase.includes("messengers")) {
          messengersBot.handleNumberMessage(msg);
        } else {
          minutesBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_AARON_PENNE:
        if (msgContentLowercase.includes("return")) {
          returnBot.handleNumberMessage(msg);
        } else {
          let apparitionSinglesTransformedValue =
            apparitionHandlerHelper.singlesTransform(msg.content);
          let apparitionSetsTransformedValue =
            apparitionHandlerHelper.setsTransform(msg.content);
          if (apparitionSinglesTransformedValue !== null) {
            msg.content = apparitionSinglesTransformedValue;
          } else
          if (apparitionSetsTransformedValue !== null) {
            msg.content = apparitionSetsTransformedValue;
          }
          apparitionsBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_RADIX:
        inspiralsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_DALENZ:
        aerialViewBot.handleNumberMessage(msg);
        break;
      case CHANNEL_CHAOSCONSTRUCT:
        synapsesBot.handleNumberMessage(msg);
        break;
      case CHANNEL_STINA_JONES:
        algobotsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_MICHAEL_CONNOLLY:
        if (msgContentLowercase.includes("divisions")) {
          divisionsBot.handleNumberMessage(msg);
        } else {
          elementalsBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_MATT_DESL:
        let subscapeSinglesTransformedValue =
          subscapeHandlerHelper.singlesTransform(msg.content);
        let subscapeSetsTransformedValue =
          subscapeHandlerHelper.setsTransform(msg.content);
        if (subscapeSinglesTransformedValue !== null) {
          msg.content = subscapeSinglesTransformedValue;
        } else
        if (subscapeSetsTransformedValue !== null) {
          msg.content = subscapeSetsTransformedValue;
        }
        subscapesBot.handleNumberMessage(msg);
        break;
      case CHANNEL_NUMBERSINMOTION:
        let watercolorDreamsSinglesTransformedValue =
          watercolorDreamHandlerHelper.singlesTransform(msg.content);
        let watercolorDreamsSetsTransformedValue =
          watercolorDreamHandlerHelper.setsTransform(msg.content);
        if (watercolorDreamsSinglesTransformedValue !== null) {
          msg.content = watercolorDreamsSinglesTransformedValue;
        } else if (watercolorDreamsSetsTransformedValue !== null) {
          msg.content = watercolorDreamsSetsTransformedValue;
        }
        numbersInMotionBot.handleNumberMessage(msg);
        break;
      case CHANNEL_JASON_TING:
        bubbleBlobbyBot.handleNumberMessage(msg);
        break;
      case CHANNEL_HAN_X_NICOLAS_DANIEL:
        algoRhythmsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_TYLER_HOBBS:
        fidenzaBot.handleNumberMessage(msg);
        break;
      case CHANNEL_SHVEMBLDR:
        blocksOfArtBot.handleNumberMessage(msg);
        break;
      case CHANNEL_STEFAN_CONTIERO:
        frammentiBot.handleNumberMessage(msg);
        break;
      case CHANNEL_REAS:
        centuryBot.handleNumberMessage(msg);
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
