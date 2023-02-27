import * as dotenv from 'dotenv'
dotenv.config()
import { Client, Events, GatewayIntentBits } from 'discord.js'
const express = require('express')
const bodyParser = require('body-parser')
const getArtBlocksFactoryProjects =
  require('./Utils/parseArtBlocksAPI').getArtBlocksFactoryProjects

const ArtIndexerBot = require('./Classes/ArtIndexerBot').ArtIndexerBot
import { MintBot } from './Classes/MintBot'
const projectConfig = require('./ProjectConfig/projectConfig').projectConfig

import { getEngineContracts } from './Utils/parseArtBlocksAPI'
import { ReservoirListBot } from './Classes/APIBots/ReservoirListBot'
import { ReservoirSaleBot } from './Classes/APIBots/ReservoirSaleBot'

const { ArchipelagoBot } = require('./Classes/APIBots/ArchipelagoBot')
// Special handlers.
const {
  getPBABProjects,
  getArtBlocksXPaceProjects,
  getArtBlocksXBMProjects,
} = require('./Utils/parseArtBlocksAPI')

const smartBotResponse = require('./Utils/smartBotResponse').smartBotResponse

// Misc. server configuration info.
const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const PORT = process.env.PORT || 3001

export const CORE_CONTRACTS: {
  [id: string]: string
} = require('./ProjectConfig/coreContracts.json')
export const EXPLORATIONS_CONTRACTS: {
  [id: string]: string
} = require('./ProjectConfig/explorationsContracts.json')
export const COLLAB_CONTRACTS: {
  [id: string]: string
} = require('./ProjectConfig/collaborationContracts.json')
export const ENGINE_CONTRACTS = getEngineContracts()

// Factory Channel
const CHANNEL_FACTORY = projectConfig.chIdByName['factory-projects']

// Block Talk
const CHANNEL_BLOCK_TALK = projectConfig.chIdByName['block-talk']

// PBAB Chat
const CHANNEL_PBAB_CHAT = projectConfig.chIdByName['engine-chat']

// AB x Pace
const CHANNEL_AB_X_PACE = projectConfig.chIdByName['art-blocks-x-pace']
const CHANNEL_AB_X_BM = projectConfig.chIdByName['art-blocks-x-bright-moments']

// AB Art Chat
const CHANNEL_ART_CHAT = projectConfig.chIdByName['ab-art-chat']

// Rate (in ms) to poll API endpoints
const API_POLL_TIME_MS = 10000
const reservoirListLimit = 50
const reservoirSaleLimit = 100

// Note: Please set PRODUCTION_MODE to true if testing locally
const PRODUCTION_MODE =
  process.env.PRODUCTION_MODE &&
  process.env.PRODUCTION_MODE.toLowerCase() === 'true'

console.log('PRODUCTION_MODE: ', PRODUCTION_MODE)

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

type MintEvent = {
  event: {
    data: {
      new: {
        contract_address: string
        owner_address: string
        project_name: string
        token_id: string
        minted_at: string
      }
    }
  }
}

app.post('/new-mint', function (req: any, res: any) {
  const mintEvent = req.body as MintEvent
  const mintData = mintEvent.event.data.new

  if (req.headers.webhook_secret !== process.env.MINT_WEBHOOK_SECRET) {
    console.log('Invalid mint webhook secret')
    res.status(401).json({ status: 'unauthorized' })
    return
  }

  mintBot.addMint(
    mintData.contract_address,
    mintData.token_id,
    mintData.owner_address
  )
  res.setHeader('Content-Type', 'application/json')
  res.json({
    success: true,
  })
})

app.listen(PORT, function () {
  console.log('Server is listening on port ', PORT)
})

// Bot setup.
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})
if (PRODUCTION_MODE) {
  bot.login(DISCORD_TOKEN)
}

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user?.tag}!`)
  artIndexerBot.startBirthdayRoutine(bot.channels.cache, projectConfig)
})

const factoryParty = new ArtIndexerBot(getArtBlocksFactoryProjects)
const artIndexerBot = new ArtIndexerBot()
const pbabIndexerBot = new ArtIndexerBot(getPBABProjects)
const abXpaceIndexerBot = new ArtIndexerBot(getArtBlocksXPaceProjects)
const abXbmIndexerBot = new ArtIndexerBot(getArtBlocksXBMProjects)

export const mintBot = new MintBot(bot)

bot.on(Events.MessageCreate, async (msg) => {
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
      case CHANNEL_AB_X_BM:
        abXbmIndexerBot.handleNumberMessage(msg)
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
          msg.reply({ embeds: [smartResponse] })
        }
      }
    }
  )
})

const initReservoirBots = async () => {
  const buildContractsString = (contracts: string[]): string => {
    const ans = 'contracts=' + contracts.join('&contracts=')
    return ans
  }

  const createReservoirBots = (
    listParams: string,
    saleParams: string,
    pollTimeMs: number
  ) => {
    new ReservoirListBot(
      `https://api.reservoir.tools/orders/asks/v3?${listParams}&sortBy=createdAt&limit=${reservoirListLimit}`,
      pollTimeMs,
      bot,
      {
        Accept: 'application/json',
        'x-api-key': process.env.RESERVOIR_API_KEY,
      }
    )

    new ReservoirSaleBot(
      `https://api.reservoir.tools/sales/v4?${saleParams}&limit=${reservoirSaleLimit}`,
      pollTimeMs,
      bot,
      {
        Accept: 'application/json',
        'x-api-key': process.env.RESERVOIR_API_KEY,
      }
    )
  }

  const allContracts = Object.values(CORE_CONTRACTS)
    .concat(Object.values(COLLAB_CONTRACTS))
    .concat(Object.values(EXPLORATIONS_CONTRACTS))
    .concat(await ENGINE_CONTRACTS)

  const RESERVOIR_CONTRACT_LIMIT = 20
  const numBotInstances = Math.ceil(
    allContracts.length / RESERVOIR_CONTRACT_LIMIT
  )
  for (let i = 0; i < numBotInstances; i++) {
    const start = i * RESERVOIR_CONTRACT_LIMIT
    const end = start + RESERVOIR_CONTRACT_LIMIT
    const listParams = buildContractsString(allContracts.slice(start, end))
    const saleParams = listParams.replaceAll('contracts', 'contract')

    createReservoirBots(listParams, saleParams, API_POLL_TIME_MS + i * 3000)
  }
}

// Instantiate API Pollers (if not in test mode)
if (PRODUCTION_MODE) {
  initReservoirBots()
  const archipelagoBot = new ArchipelagoBot(bot)
  archipelagoBot.activate()
}
