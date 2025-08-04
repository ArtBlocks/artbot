import * as dotenv from 'dotenv'
dotenv.config()
import { Client, Events, GatewayIntentBits } from 'discord.js'
const express = require('express')
const bodyParser = require('body-parser')
import { ProjectConfig } from './ProjectConfig/projectConfig'
export let STUDIO_CONTRACTS: string[] = []
export let ENGINE_CONTRACTS: string[] = []
export let ARBITRUM_CONTRACTS: string[] = []
export let ARTIST_TWITTER_HANDLES: Map<string, string> = new Map()
export const projectConfig = new ProjectConfig()

import { ArtIndexerBot } from './Classes/ArtIndexerBot'
import { MintBot } from './Classes/MintBot'
import { ReservoirListBot } from './Classes/APIBots/ReservoirListBot'
import { ReservoirSaleBot } from './Classes/APIBots/ReservoirSaleBot'
import {
  getArbitrumContracts,
  getArtBlocksXBMProjects,
  getArtBlocksXPaceProjects,
  getEngineContracts,
  getEngineProjects,
  getStudioContracts,
  getArtistsTwitterHandles,
} from './Data/queryGraphQL'
import { InsightsBot } from './Classes/InsightsBot'
import { TriviaBot } from './Classes/TriviaBot'
import {
  waitForEngineContracts,
  waitForStudioContracts,
} from './Classes/APIBots/utils'
import { ScheduleBot } from './Classes/SchedulerBot'
import { verifyTwitter } from './Utils/twitterUtils'
import axios from 'axios'
import { paths } from '@reservoir0x/reservoir-sdk'
import { TwitterBot } from './Classes/TwitterBot'

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
getStudioContracts().then((contracts) => {
  STUDIO_CONTRACTS = contracts ?? []
})
getEngineContracts().then((contracts) => {
  ENGINE_CONTRACTS = contracts ?? []
})
getArbitrumContracts().then((contracts) => {
  ARBITRUM_CONTRACTS = contracts ?? []
})
getArtistsTwitterHandles().then((handles) => {
  ARTIST_TWITTER_HANDLES = handles
})

export const artIndexerBot = new ArtIndexerBot()
const pbabIndexerBot = new ArtIndexerBot(getEngineProjects)
const abXpaceIndexerBot = new ArtIndexerBot(getArtBlocksXPaceProjects)
const abXbmIndexerBot = new ArtIndexerBot(getArtBlocksXBMProjects)

// Factory Channel
const CHANNEL_FACTORY = projectConfig.chIdByName['factory-projects']

// Block Talk
export const CHANNEL_BLOCK_TALK = projectConfig.chIdByName['block-talk']

// PBAB Chat
const CHANNEL_ENGINE_CHAT = projectConfig.chIdByName['engine-chat']

// AB x Pace
const CHANNEL_AB_X_PACE = projectConfig.chIdByName['art-blocks-x-pace']
const CHANNEL_AB_X_BM = projectConfig.chIdByName['art-blocks-x-bright-moments']

// AB Art Chat
const CHANNEL_ART_CHAT = projectConfig.chIdByName['ab-art-chat']

const CHANNEL_ARTBOT_TESTING = projectConfig.chIdByName['artbot-test-channel']

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
        invocation: string
        project_id: string
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
    mintData.owner_address,
    mintData.invocation,
    mintData.project_id
  )
  res.setHeader('Content-Type', 'application/json')
  res.json({
    success: true,
  })
})

app.listen(PORT, '0.0.0.0', function () {
  console.log('Server is listening on port', PORT)
})

app.get('/callback', (req: any, res: any) => {
  // Used for Twitter OAuth
  verifyTwitter(res, req)
})

// Store references to all bots that need cleanup
const botsToCleanup: { cleanup: () => void }[] = []

// Bot setup.
export const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

console.log('Discord client created')
console.log('PRODUCTION_MODE:', PRODUCTION_MODE)
console.log('DISCORD_TOKEN exists:', !!DISCORD_TOKEN)

const DISCORD_LOGIN_TIMEOUT = 30000 // 30 seconds
const MAX_LOGIN_RETRIES = 5
let loginRetryCount = 0

async function attemptDiscordLogin() {
  console.log('Attempting Discord login...')

  try {
    const loginPromise = discordClient.login(DISCORD_TOKEN)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error('Discord login timed out')),
        DISCORD_LOGIN_TIMEOUT
      )
    })

    await Promise.race([loginPromise, timeoutPromise])
    console.log('Discord login attempt successful')
    loginRetryCount = 0
  } catch (error) {
    console.error('Discord login failed:', error)

    if (loginRetryCount < MAX_LOGIN_RETRIES) {
      loginRetryCount++
      // Exponential backoff: 5s, 10s, 20s, 40s, 80s
      const backoffTime = Math.min(
        5000 * Math.pow(2, loginRetryCount - 1),
        80000
      )
      console.log(
        `Retrying login attempt ${loginRetryCount}/${MAX_LOGIN_RETRIES} in ${
          backoffTime / 1000
        }s...`
      )
      setTimeout(attemptDiscordLogin, backoffTime)
    } else {
      console.error('Max login retries reached. Giving up.')
      process.exit(1)
    }
  }
}

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user?.tag}!`)
})

discordClient.on('error', (error) => {
  console.error('Discord client error:', error)
})

discordClient.on('disconnect', () => {
  console.log('Discord client disconnected')
  // Cleanup all bots
  botsToCleanup.forEach((bot) => bot.cleanup())
})

export const triviaBot = new TriviaBot(discordClient)
export const insightsBot = new InsightsBot()

new ScheduleBot(discordClient.channels.cache, projectConfig)

discordClient.on(Events.MessageCreate, async (msg) => {
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

  try {
    // Handle piece # requests.
    if (msgContent.startsWith('#')) {
      switch (channelID) {
        case CHANNEL_ENGINE_CHAT:
          pbabIndexerBot.handleNumberMessage(msg)
          break
        case CHANNEL_AB_X_PACE:
          abXpaceIndexerBot.handleNumberMessage(msg)
          break
        case CHANNEL_AB_X_BM:
          abXbmIndexerBot.handleNumberMessage(msg)
          break
        case CHANNEL_BLOCK_TALK:
        case CHANNEL_FACTORY:
        case CHANNEL_ARTBOT_TESTING:
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
  } catch (e) {
    console.error('Error handling number message: ', e)
  }
  // Handle special info questions that ArtBot knows how to answer.
  const artBotID = discordClient.user?.id
  // TODO: refactor smartbotresponse to be less irritating / have fewer args
  smartBotResponse(
    msgContentLowercase,
    msgAuthor,
    artBotID,
    channelID,
    msg
  ).then((smartResponse: string) => {
    if (smartResponse !== null && smartResponse !== undefined) {
      if (typeof smartResponse === 'string') {
        msg.reply(smartResponse)
      } else {
        msg.reply({ embeds: [smartResponse] })
      }
    }
  })
})

const initReservoirBots = async () => {
  const studioContracts = await waitForStudioContracts()
  const engineContracts = await waitForEngineContracts()

  const allContracts = Object.values(CORE_CONTRACTS)
    .concat(Object.values(COLLAB_CONTRACTS))
    .concat(Object.values(EXPLORATIONS_CONTRACTS))
    .concat(studioContracts ?? [])
    .concat(engineContracts ?? [])

  type ReservoirContractSetResponse =
    paths['/contracts-sets/v1']['post']['responses']['200']['schema']

  const response = await axios.request<ReservoirContractSetResponse>({
    method: 'POST',
    url: 'https://api.reservoir.tools/contracts-sets/v1',
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY,
    },
    data: { contracts: allContracts },
  })

  const contractSetID = response.data.contractsSetId

  // List endpoint lets you use contractSet param which is very nice
  const listBot = new ReservoirListBot(
    `https://api.reservoir.tools/orders/asks/v5?contractsSetId=${contractSetID}&sortBy=createdAt&limit=${reservoirListLimit}&normalizeRoyalties=true`,
    API_POLL_TIME_MS,
    discordClient,
    {
      Accept: 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY,
    }
  )
  botsToCleanup.push(listBot)

  // Sadly sales endpoint does not support contractSet param yet - need to batch by 20 contracts
  const RESERVOIR_CONTRACT_LIMIT = 20
  const numBotInstances = Math.ceil(
    allContracts.length / RESERVOIR_CONTRACT_LIMIT
  )
  for (let i = 0; i < numBotInstances; i++) {
    const start = i * RESERVOIR_CONTRACT_LIMIT
    const end = start + RESERVOIR_CONTRACT_LIMIT
    const saleParams =
      'contract=' + allContracts.slice(start, end).join('&contract=')

    const saleBot = new ReservoirSaleBot(
      `https://api.reservoir.tools/sales/v4?${saleParams}&limit=${reservoirSaleLimit}`,
      API_POLL_TIME_MS + i * 3000,
      discordClient,
      {
        Accept: 'application/json',
        'x-api-key': process.env.RESERVOIR_API_KEY,
      },
      abTwitterBot
    )
    botsToCleanup.push(saleBot)
  }
}

// Only instantiate TwitterBot if TWITTER_ENABLED is true
const isTwitterEnabled = process.env.TWITTER_ENABLED?.toLowerCase() === 'true'
console.log('Twitter functionality enabled:', isTwitterEnabled)

const abTwitterBot = isTwitterEnabled
  ? new TwitterBot({
      appKey: process.env.AB_TWITTER_API_KEY ?? '',
      appSecret: process.env.AB_TWITTER_API_SECRET ?? '',
      accessToken: process.env.AB_TWITTER_OAUTH_TOKEN ?? '',
      accessSecret: process.env.AB_TWITTER_OAUTH_SECRET ?? '',
    })
  : undefined

if (!isTwitterEnabled) {
  console.log('TwitterBot disabled via TWITTER_ENABLED environment variable')
}

export const mintBot = new MintBot(discordClient, abTwitterBot)

// Instantiate API Pollers (if not in test mode)
if (PRODUCTION_MODE) {
  initReservoirBots()
}

if (PRODUCTION_MODE) {
  attemptDiscordLogin()
}

// Handle application shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Cleaning up...')
  // Cleanup all bots
  botsToCleanup.forEach((bot) => bot.cleanup())
  // Disconnect Discord client
  discordClient.destroy()
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Cleaning up...')
  // Cleanup all bots
  botsToCleanup.forEach((bot) => bot.cleanup())
  // Disconnect Discord client
  discordClient.destroy()
  process.exit(0)
})
