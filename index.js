require('dotenv').config();
const {Client} = require('discord.js');
const {GiveawaysManager} = require('discord-giveaways');
const express = require('express');
const bodyParser = require('body-parser');
const {
  OpenSeaStreamClient,
  EventType,
} = require('./local-dependencies/opensea-stream-js-sdk');
const {WebSocket} = require('ws');
const {triageOpenseaMessage} = require('./Utils/activityTriager');
const client = new OpenSeaStreamClient({
  apiUrl: 'wss://stream.openseabeta.com/socket',
  token: process.env.OPENSEA_API_KEY,
  connectOptions: {
    transport: WebSocket,
  },
});
const AddressCollector = require('./Classes/AddressCollector').AddressCollector;
const FactoryBot = require('./Classes/FactoryBot').FactoryBot;
const RandomBot = require('./Classes/RandomBot').RandomBot;
const projectConfig = require('./ProjectConfig/projectConfig').projectConfig;

// Special handlers.
const triageActivityMessage =
  require('./Utils/activityTriager').triageActivityMessage;
const smartBotResponse = require('./Utils/smartBotResponse').smartBotResponse;
const handleGiveawayMessage =
  require('./Utils/giveawayCommands').handleGiveawayMessage;

// Misc. server configuration info.
const TOKEN = process.env.TOKEN;
const PORT = process.env.PORT || 3000;

// Trade activity Discord channel IDs.
const PROD_CHANNEL_ACTIVITY_ALL = projectConfig.chIdByName['prod_all_activity'];

// Factory Channel
const CHANNEL_FACTORY = projectConfig.chIdByName['factory-projects'];

// AB Art Chat
const CHANNEL_ART_CHAT = projectConfig.chIdByName['ab-art-chat'];

// Special address collection channel.
const CHANNEL_ADDRESS_COLLECTION = process.env.CHANNEL_ADDRESS_COLLECTION;

// App setup.
const app = express();

app.use(bodyParser.json());

app.post('/update', function(req, res) {
  console.log(
      'received update with body:\n',
      JSON.stringify(req.body, null, 2),
      '\n',
  );

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

bot.on('ready', (client) => {
  console.info(`Logged in as ${bot.user.tag}!`);
  randomGuy.startRoutine(bot.channels.cache.get(CHANNEL_ART_CHAT));
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
bot.giveawaysManager.on(
    'giveawayReactionAdded',
    (giveaway, member, reaction) => {
      console.log(
          `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`,
      );
    },
);
bot.giveawaysManager.on(
    'giveawayReactionRemoved',
    (giveaway, member, reaction) => {
      console.log(
          `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`,
      );
    },
);
bot.giveawaysManager.on('giveawayEnded', (giveaway, winners) => {
  console.log(
      `Giveaway #${giveaway.messageID} ended! Winners: ${winners
          .map((member) => member.user.username)
          .join(', ')}`,
  );
});

client.onItemListed('art-blocks', (event) => {
  console.log('AB LIST!');
  console.log(event);
});
client.onItemSold('art-blocks', (event) => {
  console.log('AB SALE!');
  console.log(event);
});
client.onItemListed('art-blocks-factory', (event) => {
  console.log('AB LIST!');
  console.log(event);
});
client.onItemSold('art-blocks-factory', (event) => {
  console.log('AB SALE!');
  console.log(event);
});
client.onItemListed('art-blocks-playground', (event) => {
  console.log('AB LIST!');
  console.log(event);
});
client.onItemSold('art-blocks-playground', (event) => {
  console.log('AB SALE!');
  console.log(event);
});
client.onEvents(
    'art-blocks',
    [EventType.ITEM_LISTED, EventType.ITEM_SOLD],
    (event) => {
      triageOpenseaMessage(event, bot);
    },
);
client.onEvents(
    'art-blocks-factory',
    [EventType.ITEM_LISTED, EventType.ITEM_SOLD],
    (event) => {
      triageOpenseaMessage(event, bot);
    },
);
client.onEvents(
    'art-blocks-playground',
    [EventType.ITEM_LISTED, EventType.ITEM_SOLD],
    (event) => {
      triageOpenseaMessage(event, bot);
    },
);
client.onEvents(
    'blockbob-rorschach-by-eboy',
    [EventType.ITEM_LISTED, EventType.ITEM_SOLD],
    (event) => {
      console.log(event);
      triageOpenseaMessage(event, bot);
    },
);
client.onEvents(
    'memories-of-qilin-by-emily-xie',
    [EventType.ITEM_LISTED, EventType.ITEM_SOLD],
    (event) => {
      console.log(event);
      triageOpenseaMessage(event, bot);
    },
);
client.onEvents(
    'automatism-by-yazid',
    [EventType.ITEM_LISTED, EventType.ITEM_SOLD],
    (event) => {
      console.log(event);
      triageOpenseaMessage(event, bot);
    },
);
client.onEvents(
    'anticyclone-by-william-mapan',
    [EventType.ITEM_LISTED, EventType.ITEM_SOLD],
    (event) => {
      console.log(event);
      triageOpenseaMessage(event, bot);
    },
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

  // If there is not a channel ID configured where the message was sent
  // short-circuit handling the message
  const channel = projectConfig.channels[channelID];
  if (!channel) {
    return;
  }

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
      case CHANNEL_FACTORY:
        factoryParty.handleNumberMessage(msg);
        break;
      case CHANNEL_ART_CHAT:
        randomGuy.handleRandomMessage(msg);
        break;
      // Fall-back - expect a project bot to handle
      default:
        projectConfig.routeProjectNumberMsg(channelID, msg);
        break;
    }
    return;
  }

  // Handle special info questions that ArtBot knows how to answer.
  const artBotID = bot.user.id;
  smartBotResponse(msgContentLowercase, msgAuthor, artBotID, channelID).then(
      (smartResponse) => {
        if (smartResponse !== null && smartResponse !== undefined) {
          msg.reply(null, {
            embed: smartResponse,
            allowedMentions: {
              repliedUser: true,
            },
          });
        }
      },
  );
});
