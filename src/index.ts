import * as dotenv from 'dotenv'
dotenv.config()
import { Client } from 'discord.js'
const express = require('express')
const bodyParser = require('body-parser')
const getArtBlocksFactoryProjects =
  require('./Utils/parseArtBlocksAPI').getArtBlocksFactoryProjects

const ArtIndexerBot = require('./Classes/ArtIndexerBot').ArtIndexerBot
const projectConfig = require('./ProjectConfig/projectConfig').projectConfig
const CORE_CONTRACTS = require('./ProjectConfig/coreContracts.json')
const { ReservoirSaleBot } = require('./Classes/APIBots/ReservoirSaleBot')
const { ReservoirListBot } = require('./Classes/APIBots/ReservoirListBot')
const { ArchipelagoBot } = require('./Classes/APIBots/ArchipelagoBot')
// Special handlers.
const {
  getPBABProjects,
  getArtBlocksXPaceProjects,
} = require('./Utils/parseArtBlocksAPI')
const COLLAB_CONTRACTS = require('./ProjectConfig/collaborationContracts.json')
const smartBotResponse = require('./Utils/smartBotResponse').smartBotResponse

// Misc. server configuration info.
const TOKEN = process.env.TOKEN
const PORT = process.env.PORT || 3001

// Factory Channel
const CHANNEL_FACTORY = projectConfig.chIdByName['factory-projects']

// Block Talk
const CHANNEL_BLOCK_TALK = projectConfig.chIdByName['block-talk']

// PBAB Chat
const CHANNEL_PBAB_CHAT = projectConfig.chIdByName['pbab-chat']

// AB x Pace
const CHANNEL_AB_X_PACE = projectConfig.chIdByName['art-blocks-x-pace']

// AB Art Chat
const CHANNEL_ART_CHAT = projectConfig.chIdByName['ab-art-chat']

// Rate (in ms) to poll API endpoints
const API_POLL_TIME_MS = 10000
const reservoirListLimit = 50
const reservoirSaleLimit = 100

const TEST_MODE = process.env.TEST_MODE ?? false

// App setup.
const app = express()

app.use(bodyParser.json())

app.post('/update', function (req: any, res: any) {
  console.log(
    'received update with body:\n',
    JSON.stringify(req.body, null, 2),
    '\n'
  )

  res.setHeader('Content-Type', 'application/json')
  res.json({
    success: true,
  })
})

app.get('/update', function (req: any, res: any) {
  console.log('received get with body:\n', req.body, '\n')

  res.setHeader('Content-Type', 'application/json')
  res.json({
    success: true,
  })
})

app.listen(PORT, function () {
  console.log('Server is listening on port ', PORT)
})

// Bot setup.
const bot = new Client()
bot.login(TOKEN)

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user?.tag}!`)
  artIndexerBot.startRandomRoutine(bot.channels.cache.get(CHANNEL_ART_CHAT))
  artIndexerBot.startBirthdayRoutine(bot.channels.cache, projectConfig)
})

const factoryParty = new ArtIndexerBot(getArtBlocksFactoryProjects)
const artIndexerBot = new ArtIndexerBot()
const pbabIndexerBot = new ArtIndexerBot(getPBABProjects)
const abXpaceIndexerBot = new ArtIndexerBot(getArtBlocksXPaceProjects)

// Message event handler.
bot.on('message', (msg) => {
  const msgAuthor = msg.author.username
  const msgContent = msg.content
  const msgContentLowercase = msgContent.toLowerCase()
  const channelID = msg.channel.id

  // If there is not a channel ID configured where the message was sent
  // short-circuit handling the message
  const channel = projectConfig.channels[channelID]
  if (!channel) {
    return
  }

  // Handle piece # requests.
  if (msgContent.startsWith('#')) {
    switch (channelID) {
      case CHANNEL_FACTORY:
        factoryParty.handleNumberMessage(msg)
        break
      case CHANNEL_BLOCK_TALK:
        artIndexerBot.handleNumberMessage(msg)
        break
      case CHANNEL_PBAB_CHAT:
        pbabIndexerBot.handleNumberMessage(msg)
        break
      case CHANNEL_AB_X_PACE:
        abXpaceIndexerBot.handleNumberMessage(msg)
        break
      case CHANNEL_ART_CHAT:
        artIndexerBot.handleNumberMessage(msg)
        break
      // Fall-back - expect a project bot to handle
      default:
        projectConfig.routeProjectNumberMsg(channelID, msg)
        break
    }
    return
  }

  // Handle special info questions that ArtBot knows how to answer.
  const artBotID = bot.user?.id
  smartBotResponse(msgContentLowercase, msgAuthor, artBotID, channelID).then(
    (smartResponse: string) => {
      if (smartResponse !== null && smartResponse !== undefined) {
        if (typeof smartResponse === 'string') {
          msg.reply(smartResponse)
        } else {
          msg.reply(null, {
            embed: smartResponse,
          })
        }
      }
    }
  )
})

// Instantiate API Pollers (if not in test mode)
if (!TEST_MODE) {
  new ReservoirListBot(
    `https://api.reservoir.tools/orders/asks/v3?contracts=${CORE_CONTRACTS.OG}&contracts=${CORE_CONTRACTS.V2}&sortBy=createdAt&limit=${reservoirListLimit}`,
    API_POLL_TIME_MS,
    bot,
    {
      Accept: 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY,
    }
  )

  new ReservoirSaleBot(
    `https://api.reservoir.tools/sales/v4?contract=${CORE_CONTRACTS.OG}&contract=${CORE_CONTRACTS.V2}&limit=${reservoirSaleLimit}`,
    API_POLL_TIME_MS,
    bot,
    {
      Accept: 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY,
    }
  )

  const archipelagoBot = new ArchipelagoBot(bot)
  archipelagoBot.activate()

  // Listing/Sales bots for Pace collab contract
  new ReservoirListBot(
    `https://api.reservoir.tools/orders/asks/v3?contracts=${COLLAB_CONTRACTS.AB_X_PACE}&sortBy=createdAt&limit=${reservoirListLimit}`,
    API_POLL_TIME_MS * 2,
    bot,
    {
      Accept: 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY,
    },
    COLLAB_CONTRACTS.AB_X_PACE
  )

  new ReservoirSaleBot(
    `https://api.reservoir.tools/sales/v4?contract=${COLLAB_CONTRACTS.AB_X_PACE}&limit=${reservoirSaleLimit}`,
    API_POLL_TIME_MS * 2,
    bot,
    {
      Accept: 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY,
    },
    COLLAB_CONTRACTS.AB_X_PACE
  )
}
