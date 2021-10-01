require('dotenv').config();
const {
  Client,
  MessageEmbed,
} = require('discord.js');
const {GiveawaysManager} = require('discord-giveaways');
const express = require('express');
const bodyParser = require('body-parser');

const AddressCollector = require('./Classes/AddressCollector').AddressCollector;
const ProjectBot = require('./Classes/ProjectBot').ProjectBot;
const FactoryBot = require('./Classes/FactoryBot').FactoryBot;
const RandomBot = require('./Classes/RandomBot').RandomBot;

// Special handlers.
const triageActivityMessage = require('./Utils/activityTriager').triageActivityMessage;
const smartBotResponse = require('./Utils/smartBotResponse').smartBotResponse;
const handleGiveawayMessage = require('./Utils/giveawayCommands').handleGiveawayMessage;

// Misc. server configuration info.
const TOKEN = process.env.TOKEN;
const SERVER = process.env.SERVER;
const PORT = process.env.PORT || 3000;

// Trade activity Discord channel IDs.
const PROD_CHANNEL_ACTIVITY_ALL = process.env.PROD_CHANNEL_ACTIVITY_ALL;

// Special Squiggle DAO honorary channel ID.
const CHANNEL_SQUIGGLE_DAO_SQUIGGLE_SQUARE = process.env.CHANNEL_SQUIGGLE_DAO_SQUIGGLE_SQUARE;

// Tyler Hobbs fidenza channel ID
const CHANNEL_FIDENZA_GENERAL = process.env.CHANNEL_FIDENZA_GENERAL;

// Curated artist Discord channel IDs.
const CHANNEL_AARON_PENNE = process.env.CHANNEL_AARON_PENNE;
const CHANNEL_ALEXIS_ANDRE = process.env.CHANNEL_ALEXIS_ANDRE;
const CHANNEL_ANNA_CARRERAS = process.env.CHANNEL_ANNA_CARRERAS;
const CHANNEL_ALIDA_SUN = process.env.CHANNEL_ALIDA_SUN;
const CHANNEL_BEERVANGEER = process.env.CHANNEL_BEERVANGEER;
const CHANNEL_BRYAN_BRINKMAN = process.env.CHANNEL_BRYAN_BRINKMAN;
const CHANNEL_CHAOSCONSTRUCT = process.env.CHANNEL_CHAOSCONSTRUCT;
const CHANNEL_DAIM = process.env.CHANNEL_DAIM;
const CHANNEL_DALENZ = process.env.CHANNEL_DALENZ;
const CHANNEL_DANDAN = process.env.CHANNEL_DANDAN;
const CHANNEL_DARIEN_BRITO = process.env.CHANNEL_DARIEN_BRITO;
const CHANNEL_DMITRI_CHERNIAK = process.env.CHANNEL_DMITRI_CHERNIAK;
const CHANNEL_GE1DOOT = process.env.CHANNEL_GE1DOOT;
const CHANNEL_HAN_X_NICOLAS_DANIEL = process.env.CHANNEL_HAN_X_NICOLAS_DANIEL;
const CHANNEL_HIDEKI = process.env.CHANNEL_HIDEKI;
const CHANNEL_JASON_TING = process.env.CHANNEL_JASON_TING;
const CHANNEL_JEFF_DAVIS = process.env.CHANNEL_JEFF_DAVIS;
const CHANNEL_JOSHUA_BAGLEY = process.env.CHANNEL_JOSHUA_BAGLEY;
const CHANNEL_KAI = process.env.CHANNEL_KAI;
const CHANNEL_GOLID = process.env.CHANNEL_GOLID;
const CHANNEL_LOREN_BEDNAR = process.env.CHANNEL_LOREN_BEDNAR;
const CHANNEL_LUXPRIS = process.env.CHANNEL_LUXPRIS;
const CHANNEL_MATT_DESL = process.env.CHANNEL_MATT_DESL;
const CHANNEL_MONICA_RIZZOLLI = process.env.CHANNEL_MONICA_RIZZOLLI;
const CHANNEL_MICHAEL_CONNOLLY = process.env.CHANNEL_MICHAEL_CONNOLLY;
const CHANNEL_NUMBERSINMOTION = process.env.CHANNEL_NUMBERSINMOTION;
const CHANNEL_PITER_PASMA = process.env.CHANNEL_PITER_PASMA;
const CHANNEL_PXLQ = process.env.CHANNEL_PXLQ;
const CHANNEL_RADIX = process.env.CHANNEL_RADIX;
const CHANNEL_RAFAEL_ROZENDAAL = process.env.CHANNEL_RAFAEL_ROZENDAAL;
const CHANNEL_REAS = process.env.CHANNEL_REAS;
const CHANNEL_RICH_LORD = process.env.CHANNEL_RICH_LORD;
const CHANNEL_SIMON_DE_MAI = process.env.CHANNEL_SIMON_DE_MAI;
const CHANNEL_SHVEMBLDR = process.env.CHANNEL_SHVEMBLDR;
const CHANNEL_SNOWFRO = process.env.CHANNEL_SNOWFRO;
const CHANNEL_STEFAN_CONTIERO = process.env.CHANNEL_STEFAN_CONTIERO;
const CHANNEL_STINA_JONES = process.env.CHANNEL_STINA_JONES;
const CHANNEL_TYLER_HOBBS = process.env.CHANNEL_TYLER_HOBBS;
const CHANNEL_WILLIAM_TAN = process.env.CHANNEL_WILLIAM_TAN;
const CHANNEL_ZEBLOCKS = process.env.CHANNEL_ZEBLOCKS;

// Mints channel, for giveaways.
const CHANNEL_MINTS = process.env.CHANNEL_MINTS;

// Factory Channel
const CHANNEL_FACTORY = process.env.CHANNEL_FACTORY;

// AB Art Chat
const CHANNEL_ART_CHAT = process.env.CHANNEL_ART_CHAT;

// Special address collection channel.
const CHANNEL_ADDRESS_COLLECTION = process.env.CHANNEL_ADDRESS_COLLECTION;

// Minting contract addresses.
const OG_MINTING_CONTRACT_ADDRESS = '0x059edd72cd353df5106d2b9cc5ab83a52287ac3a';
const V2_MINTING_CONTRACT_ADDRESS = '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270';

// App setup.
const app = express();

app.use(bodyParser.json());

app.post('/update', function(req, res) {
  console.log('received update with body:\n', JSON.stringify(req.body, null, 2), '\n');

  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
  });
});

app.get('/update', function(req, res) {
  console.log('received get with body:\n', req.body, '\n');

  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
  });
});

app.listen(PORT, function() {
  console.log('Server is listening on port ', PORT);
});

// Bot setup.
const bot = new Client();
bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

// Manage Giveaways with Artbot
bot.giveawaysManager = new GiveawaysManager(bot, {
  storage: './giveaways.json',
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: '#FF0000',
    reaction: '🎉',
  },
});
bot.giveawaysManager.on('giveawayReactionAdded', (giveaway, member, reaction) => {
  console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});
bot.giveawaysManager.on('giveawayReactionRemoved', (giveaway, member, reaction) => {
  console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});
bot.giveawaysManager.on('giveawayEnded', (giveaway, winners) => {
  console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

// Curated project Discord channel message handlers.
const singularityBot = new ProjectBot(
    8,
    V2_MINTING_CONTRACT_ADDRESS,
    1024,
    'Singularity',
);
const ignitionBot = new ProjectBot(
    9,
    V2_MINTING_CONTRACT_ADDRESS,
    512,
    'Ignition',
);
const squiggleBot = new ProjectBot(
    0,
    OG_MINTING_CONTRACT_ADDRESS,
    10000,
    'Chromie Squiggle',
);
const ringersBot = new ProjectBot(
    13,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Ringers',
    {
        "singles": "ringerSingles.json",
        "sets": "ringerSets.json"
    }
);
const genesisBot = new ProjectBot(
    1,
    OG_MINTING_CONTRACT_ADDRESS,
    512,
    'Genesis',
);
const constructionBot = new ProjectBot(
    2,
    OG_MINTING_CONTRACT_ADDRESS,
    500,
    'Construction Token',
);
const dynamicSlicesBot = new ProjectBot(
    4,
    V2_MINTING_CONTRACT_ADDRESS,
    512,
    'Dynamic Slices',
);
const deconstructionsBot = new ProjectBot(
    7,
    V2_MINTING_CONTRACT_ADDRESS,
    200,
    'Elevated Deconstructions',
);
const nimbudsBot = new ProjectBot(
    10,
    V2_MINTING_CONTRACT_ADDRESS,
    400,
    'Nimbuds',
);
const hyperhashBot = new ProjectBot(
    11,
    V2_MINTING_CONTRACT_ADDRESS,
    369,
    'HyperHash',
);
const unigridsBot = new ProjectBot(
    12,
    V2_MINTING_CONTRACT_ADDRESS,
    421,
    'Unigrids',
);
const bitBot = new ProjectBot(
    21,
    V2_MINTING_CONTRACT_ADDRESS,
    1024,
    '27-Bit Digital',
);
const spectronBot = new ProjectBot(
    17,
    V2_MINTING_CONTRACT_ADDRESS,
    400,
    'Spectron',
);
const cryptoblotBot = new ProjectBot(
    3,
    V2_MINTING_CONTRACT_ADDRESS,
    1921,
    'Cryptoblots',
);
const archetypeBot = new ProjectBot(
    23,
    V2_MINTING_CONTRACT_ADDRESS,
    600,
    'Archetype',
);
const minutesBot = new ProjectBot(
    27,
    V2_MINTING_CONTRACT_ADDRESS,
    720,
    '720 Minutes',
);
const apparitionsBot = new ProjectBot(
    28,
    V2_MINTING_CONTRACT_ADDRESS,
    1500,
    'Apparitions',
    {
        "sets": "apparitionSets.json",
        "singles": "apparitionSingles.json"
    }
);
const inspiralsBot = new ProjectBot(
    29,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Inspirals',
);
const aerialViewBot = new ProjectBot(
    35,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Aerial View',
);
const synapsesBot = new ProjectBot(
    39,
    V2_MINTING_CONTRACT_ADDRESS,
    700,
    'Synapses',
);
const algobotsBot = new ProjectBot(
    40,
    V2_MINTING_CONTRACT_ADDRESS,
    500,
    'Algobots',
);
const elementalsBot = new ProjectBot(
    41,
    V2_MINTING_CONTRACT_ADDRESS,
    600,
    'Elementals',
);
const subscapesBot = new ProjectBot(
    53,
    V2_MINTING_CONTRACT_ADDRESS,
    650,
    'Subscapes',
    {
        "sets": "subscapeSets.json",
        "singles": "subscapeSingles.json"
    }
);
const numbersInMotionBot = new ProjectBot(
    59,
    V2_MINTING_CONTRACT_ADDRESS,
    600,
    'Watercolor Dreams',
    {
        "sets": "watercolorDreamSets.json",
        "singles": "watercolorDreamSingles.json"
    }
);
const bubbleBlobbyBot = new ProjectBot(
    62,
    V2_MINTING_CONTRACT_ADDRESS,
    500,
    'Bubble Blobby',
);
const algoRhythmsBot = new ProjectBot(
    64,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'AlgoRhythms',
);
const frammentiBot = new ProjectBot(
    72,
    V2_MINTING_CONTRACT_ADDRESS,
    555,
    'Frammenti',
);
const blocksOfArtBot = new ProjectBot(
    74,
    V2_MINTING_CONTRACT_ADDRESS,
    500,
    'The Blocks of Art',
);
const fidenzaBot = new ProjectBot(
    78,
    V2_MINTING_CONTRACT_ADDRESS,
    999,
    'Fidenza',
);
const dreamsBot = new ProjectBot(
    89,
    V2_MINTING_CONTRACT_ADDRESS,
    700,
    'Dreams',
    {
        "sets": "dreamSets.json",
        "singles": "dreamSingles.json"
    }
);
const centuryBot = new ProjectBot(
    100,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Century',
);
const glitchBot = new ProjectBot(
    114,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'glitch crystal monsters',
);
const endlessBot = new ProjectBot(
    120,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Endless Nameless',
);
const pigmentsBot = new ProjectBot(
    129,
    V2_MINTING_CONTRACT_ADDRESS,
    1024,
    'Pigments',
);
const phasesBot = new ProjectBot(
    143,
    V2_MINTING_CONTRACT_ADDRESS,
    1024,
    'Phase',
);
const fragmentBot = new ProjectBot(
    159,
    V2_MINTING_CONTRACT_ADDRESS,
    1024,
    'Fragments',
);
const trossetsBot = new ProjectBot(
    147,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Trossets',
);
const skulptuurBot = new ProjectBot(
    173,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Skulptuur',
);

/*
 * Artist playground project Discord channel message handlers.
 * #jeff-davis projects
 */
const viewCardBot = new ProjectBot(
    6,
    V2_MINTING_CONTRACT_ADDRESS,
    41,
    'View Card',
);
const colorStudyBot = new ProjectBot(
    16,
    V2_MINTING_CONTRACT_ADDRESS,
    2000,
    'Color Study',
);
const rhythmBot = new ProjectBot(
    57,
    V2_MINTING_CONTRACT_ADDRESS,
    400,
    'Rhythm',
);

// #dandan projects
const gen2Bot = new ProjectBot(
    18,
    V2_MINTING_CONTRACT_ADDRESS,
    256,
    'Gen 2',
);
const gen3Bot = new ProjectBot(
    48,
    V2_MINTING_CONTRACT_ADDRESS,
    1024,
    'Gen 3',
);
// #pxlq projects
const sentienceBot = new ProjectBot(
    20,
    V2_MINTING_CONTRACT_ADDRESS,
    144,
    'Sentience',
);
const cyberCitiesBot = new ProjectBot(
    14,
    V2_MINTING_CONTRACT_ADDRESS,
    256,
    'Cyber Cities',
);
const hieroglyphsBot = new ProjectBot(
    30,
    V2_MINTING_CONTRACT_ADDRESS,
    1250,
    'Hieroglyphs',
);
// #dmitri-cherniak projects
const eternalPumpBot = new ProjectBot(
    22,
    V2_MINTING_CONTRACT_ADDRESS,
    50,
    'The Eternal Pump',
);
// #ge1doot projects
const utopiaBot = new ProjectBot(
    15,
    V2_MINTING_CONTRACT_ADDRESS,
    256,
    'Utopia',
);
const r3sonanceBot = new ProjectBot(
    19,
    V2_MINTING_CONTRACT_ADDRESS,
    512,
    'R3sonance',
);
const auroraIvBot = new ProjectBot(
    56,
    V2_MINTING_CONTRACT_ADDRESS,
    128,
    'Aurora IV',
);
// #kai projects
const pixelGlassBot = new ProjectBot(
    24,
    V2_MINTING_CONTRACT_ADDRESS,
    256,
    'Pixel Glass',
);
// #beervangeer projects
const energySculptureBot = new ProjectBot(
    26,
    V2_MINTING_CONTRACT_ADDRESS,
    369,
    'EnergySculpture',
);
// #luxpris projects
const pathfindersBot = new ProjectBot(
    25,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Pathfinders',
);
// #kjetil-golid projects
const paperArmadaBot = new ProjectBot(
    37,
    V2_MINTING_CONTRACT_ADDRESS,
    3000,
    'Paper Armada',
);
// #alexis-andrew projects
const voidBot = new ProjectBot(
    42,
    V2_MINTING_CONTRACT_ADDRESS,
    500,
    'Void',
);
const messengersBot = new ProjectBot(
    68,
    V2_MINTING_CONTRACT_ADDRESS,
    350,
    'Messengers',
);
const obiceraBot = new ProjectBot(
    130,
    V2_MINTING_CONTRACT_ADDRESS,
    529,
    'Obicera',
);
// #aaron-penne projects
const returnBot = new ProjectBot(
    77,
    V2_MINTING_CONTRACT_ADDRESS,
    300,
    'Return',
);
const ritualBot = new ProjectBot(
    172,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Rituals',
);
// #michael-connolly projects
const divisionsBot = new ProjectBot(
    108,
    V2_MINTING_CONTRACT_ADDRESS,
    500,
    'Divisions',
);
// #radix projects
const eccentricsBot = new ProjectBot(
    104,
    V2_MINTING_CONTRACT_ADDRESS,
    400,
    'Eccentrics',
);
const eccentrics2Bot = new ProjectBot(
    139,
    V2_MINTING_CONTRACT_ADDRESS,
    500,
    'Eccentrics 2: Orbits',
);
// #joshua-bagley projects
const ecumenopolisBot = new ProjectBot(
    119,
    V2_MINTING_CONTRACT_ADDRESS,
    676,
    'Ecumenopolis',
);
// #stefan-contiero projects
const rinascitaBot = new ProjectBot(
    121,
    V2_MINTING_CONTRACT_ADDRESS,
    1111,
    'Rinascita',
);
// #william-tan projects
const scribbledBot = new ProjectBot(
    131,
    V2_MINTING_CONTRACT_ADDRESS,
    1024,
    'Scribbled Boundaries',
    {
        "sets": "scribbledSets.json",
        "singles": "scribbledSingles.json"
    }
);
// #rich-lord projects
const octoGardenBot = new ProjectBot(
    103,
    V2_MINTING_CONTRACT_ADDRESS,
    333,
    'Octo Garden',
);
const geometryRunnersBot = new ProjectBot(
    138,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Geometry Runners',
    {
        "sets": "geometryRunnersSets.json",
        "singles": "geometryRunnersSingles.json"
    }
);
// #jason-ting projects
const lightBeamsBot = new ProjectBot(
    32,
    V2_MINTING_CONTRACT_ADDRESS,
    150,
    'Light Beams',
);
const transitionsBot = new ProjectBot(
    117,
    V2_MINTING_CONTRACT_ADDRESS,
    4712,
    'Transitions',
);
// #casey-reas projects
const phototaxisBot = new ProjectBot(
    164,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Phototaxis',
);
// #matt-deslauriers projects
const meridianBot = new ProjectBot(
    163,
    V2_MINTING_CONTRACT_ADDRESS,
    1000,
    'Meridian',
);

const factoryParty = new FactoryBot();
const randomGuy = new RandomBot();

// Special address collector.
const addressCollector = new AddressCollector();

// Message event handler.
bot.on('message', (msg) => {
  const msgAuthor = msg.author.username;
  const msgContent = msg.content;
  const msgContentLowercase = msgContent.toLowerCase();
  const channelID = msg.channel.id;

  /*
     * If the message is in the activity channel, forward the message on
     * To the appropriate sub-channel.
     */
  if (channelID == PROD_CHANNEL_ACTIVITY_ALL) {
    triageActivityMessage(msg, bot);
    return;
  }

  /*
     * If message is in special address collection channel, forward message
     * To that handler and return early.
     */
  if (channelID == CHANNEL_ADDRESS_COLLECTION) {
    addressCollector.addressCollectionHandler(msg);
    return;
  }

  // Respond to giveaway requests.
  if (msgContentLowercase.includes('giveaway!')) {
    console.log('Time for a giveaway');
    handleGiveawayMessage(msg, bot);
    return;
  }

  // Handle piece # requests.
  if (msgContent.startsWith('#')) {
    switch (channelID) {
      // Curated project channels.
      case CHANNEL_HIDEKI:
        singularityBot.handleNumberMessage(msg);
        break;
      case CHANNEL_GE1DOOT:
        if (msgContentLowercase.includes('utopia')) {
          utopiaBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes('r3')) {
          r3sonanceBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes('aurora')) {
          auroraIvBot.handleNumberMessage(msg);
        } else {
          ignitionBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_SNOWFRO:
      case CHANNEL_SQUIGGLE_DAO_SQUIGGLE_SQUARE:
        squiggleBot.handleNumberMessage(msg);
        break;
      case CHANNEL_DMITRI_CHERNIAK:
        if (msgContentLowercase.includes('eternal') ||
          msgContentLowercase.includes('pump')) {
          eternalPumpBot.handleNumberMessage(msg);
        } else {
          ringersBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_DANDAN:
        if (msgContentLowercase.includes('gen2') ||
          msgContentLowercase.includes('gen 2')) {
          gen2Bot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes('gen3') ||
          msgContentLowercase.includes('gen 3')) {
          gen3Bot.handleNumberMessage(msg);
        } else {
          genesisBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_JEFF_DAVIS:
        if (msgContentLowercase.includes('rhythm')) {
          rhythmBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes('color') &&
          msgContentLowercase.includes('study')) {
          colorStudyBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes('view') &&
          msgContentLowercase.includes('card')) {
          viewCardBot.handleNumberMessage(msg);
        } else {
          constructionBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_JOSHUA_BAGLEY:
        if (msgContentLowercase.includes('ecumenopolis')) {
          ecumenopolisBot.handleNumberMessage(msg);
        } else {
          dreamsBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_PXLQ:
        if (msgContentLowercase.includes('cyber') &&
          msgContentLowercase.includes('cities')) {
          cyberCitiesBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes('sentience')) {
          sentienceBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes('hieroglyphs')) {
          hieroglyphsBot.handleNumberMessage(msg);
        } else {
          dynamicSlicesBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_LUXPRIS:
        if (msgContentLowercase.includes('pathfinder')) {
          pathfindersBot.handleNumberMessage(msg);
        } else {
          deconstructionsBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_BRYAN_BRINKMAN:
        nimbudsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_BEERVANGEER:
        if (msgContentLowercase.includes('energy') &&
          msgContentLowercase.includes('sculpture')) {
          energySculptureBot.handleNumberMessage(msg);
        } else {
          hyperhashBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_ZEBLOCKS:
        unigridsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_KAI:
        if (msgContentLowercase.includes('pixel') &&
          msgContentLowercase.includes('glass')) {
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
        if (msgContentLowercase.includes('armada')) {
          paperArmadaBot.handleNumberMessage(msg);
        } else {
          archetypeBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_ALIDA_SUN:
        glitchBot.handleNumberMessage(msg);
        break;
      case CHANNEL_RAFAEL_ROZENDAAL:
        endlessBot.handleNumberMessage(msg);
        break;
      case CHANNEL_DARIEN_BRITO:
        pigmentsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_ALEXIS_ANDRE:
        if (msgContentLowercase.includes('void')) {
          voidBot.handleNumberMessage(msg);
        } else
        if (msgContentLowercase.includes('messengers')) {
          messengersBot.handleNumberMessage(msg);
        } else
        if (msgContentLowercase.includes('obicera')) {
          obiceraBot.handleNumberMessage(msg);
        } else {
          minutesBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_AARON_PENNE:
        if (msgContentLowercase.includes('return')) {
          returnBot.handleNumberMessage(msg);
        } else
        if (msgContentLowercase.includes('rituals')) {
          ritualBot.handleNumberMessage(msg);
        } else {
          apparitionsBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_RADIX:
        if (msgContentLowercase.includes('eccentrics2')) {
          eccentrics2Bot.handleNumberMessage(msg);
        } else
        if (msgContentLowercase.includes('eccentric')) {
          eccentricsBot.handleNumberMessage(msg);
        } else {
          inspiralsBot.handleNumberMessage(msg);
        }
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
        if (msgContentLowercase.includes('division')) {
          divisionsBot.handleNumberMessage(msg);
        } else {
          elementalsBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_MATT_DESL:
        if (msgContentLowercase.includes('meridian')) {
          meridianBot.handleNumberMessage(msg);
        } else {
          subscapesBot.handleNumberMessage(msg);
        }
        break;
        case CHANNEL_NUMBERSINMOTION:
        numbersInMotionBot.handleNumberMessage(msg);
        break;
      case CHANNEL_JASON_TING:
        if (msgContentLowercase.includes('light') ||
            msgContentLowercase.includes('beams')) {
          lightBeamsBot.handleNumberMessage(msg);
        } else if (msgContentLowercase.includes('bubble') ||
                   msgContentLowercase.includes('blobby')) {
          bubbleBlobbyBot.handleNumberMessage(msg);
        } else {
          transitionsBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_HAN_X_NICOLAS_DANIEL:
        algoRhythmsBot.handleNumberMessage(msg);
        break;
      case CHANNEL_TYLER_HOBBS:
        fidenzaBot.handleNumberMessage(msg);
        break;
      case CHANNEL_FIDENZA_GENERAL:
	fidenzaBot.handleNumberMessage(msg);
	break;
      case CHANNEL_SHVEMBLDR:
        blocksOfArtBot.handleNumberMessage(msg);
        break;
      case CHANNEL_STEFAN_CONTIERO:
        let tokenID = msgContentLowercase.match(/\d+/);
        if (tokenID) tokenID = parseInt(tokenId[0]);
        // Check if requested tokenID is greater than total Frammenti tokens
        if (msgContentLowercase.includes('rina') || tokenID > 554) {
          rinascitaBot.handleNumberMessage(msg);
        } else {
          frammentiBot.handleNumberMessage(msg);
        }
        break;
        case CHANNEL_WILLIAM_TAN:
        scribbledBot.handleNumberMessage(msg);
        break;
      case CHANNEL_RICH_LORD:
        if (msgContentLowercase.includes('octogarden')) {
          octoGardenBot.handleNumberMessage(msg);
        } else {
          geometryRunnersBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_REAS:
        if (msgContentLowercase.includes('century')) {
          centuryBot.handleNumberMessage(msg);
        } else {
          phototaxisBot.handleNumberMessage(msg);
        }
        break;
      case CHANNEL_LOREN_BEDNAR:
        phasesBot.handleNumberMessage(msg);
        break;
	  case CHANNEL_MONICA_RIZZOLLI:
        fragmentBot.handleNumberMessage(msg);
        break;
	  case CHANNEL_ANNA_CARRERAS:
        trossetsBot.handleNumberMessage(msg);
        break;
	  case CHANNEL_PITER_PASMA:
        skulptuurBot.handleNumberMessage(msg);
        break;
      case CHANNEL_FACTORY:
        factoryParty.handleNumberMessage(msg);
        break;
      case CHANNEL_ART_CHAT:
        randomGuy.handleRandomMessage(msg);
        break;

        // Fall-back (should never occur).
      default:
        console.log(`Unknown channel ID: ${msg.channel.id}`);
        break;
    }
    return;
  }

  // Handle special info questions that ArtBot knows how to answer.
  const artBotID = bot.user.id;
  smartBotResponse(msgContentLowercase, msgAuthor, artBotID, channelID).then((smartResponse) => {
    if (smartResponse !== null && smartResponse !== undefined) {
      msg.reply(null, {
        embed: smartResponse,
        allowedMentions: {
          repliedUser: true,
        },
      });
    }
  });
});
