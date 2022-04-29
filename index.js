require('dotenv').config();
const {Client, MessageEmbed} = require('discord.js');
const {GiveawaysManager} = require('discord-giveaways');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const AddressCollector = require('./Classes/AddressCollector').AddressCollector;
const FactoryBot = require('./Classes/FactoryBot').FactoryBot;
const RandomBot = require('./Classes/RandomBot').RandomBot;
const projectConfig = require('./ProjectConfig/projectConfig').projectConfig;

// Special handlers.
const {
  triageActivityMessage,
  triageLooksRareMessage,
} = require('./Utils/activityTriager');

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

const CORE_CONTRACTS = require('./ProjectConfig/coreContracts.json');

// Every pollTime ms, poll LooksRare API for latest Listings and Sales
const pollTime = 1500;
setInterval(looksRarePoll, pollTime, 'LIST');
setInterval(looksRarePoll, pollTime, 'SALE');

// Only deal with events that occur after this bot gets turned on
let latestLooksRareListTime = Date.now();
let latestLooksRareSaleTime = Date.now();
async function looksRarePoll(queryType) {
  const contract = CORE_CONTRACTS.V2;
  // Get 25 most recent events
  const amt = 25;
  const cursor = ''; // `&pagination[cursor]=${c}`;
  // Construct API url to poll
  const looksrareURL = `https://api.looksrare.org/api/v1/events?collection=${contract}&type=${queryType}&pagination[first]=${amt}${cursor}`;
  https: await fetch(looksrareURL, {
    method: 'GET',
  })
      .then((response) => response.json())
      .then((looksRareData) => {
        let maxTime = 0;
        for (const data of looksRareData.data) {
          const eventTime = Date.parse(data.createdAt);

          // Only deal with event if it is new
          if (
            (queryType === 'LIST' && latestLooksRareListTime < eventTime) ||
          (queryType === 'SALE' && latestLooksRareSaleTime < eventTime)
          ) {
            triageLooksRareMessage(data, bot);
          }

          // Save the time of the latest event from this batch
          if (maxTime < eventTime) {
            maxTime = eventTime;
          }
        }

        // Update latest time vars if batch has new latest time
        if (queryType === 'LIST' && maxTime > latestLooksRareListTime) {
          latestLooksRareListTime = maxTime;
        } else if (queryType === 'SALE' && maxTime > latestLooksRareSaleTime) {
          latestLooksRareSaleTime = maxTime;
        }
      })
      .catch((err) => {
        console.log(err);
        console.warn(
            `MetaData message is being sent in a degraded manner. Is OpenSea's API down? https://status.opensea.io/`,
        );
      // this.sendMetaDataMessage(null, msg, tokenID, detailsRequested);
      });
}
