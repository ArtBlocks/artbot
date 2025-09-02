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
import { ScheduleBot } from './Classes/SchedulerBot'
import { verifyTwitter } from './Utils/twitterUtils'
import { TwitterBot } from './Classes/TwitterBot'

import { OpenSeaStreamClient } from '@opensea/stream-js'
import { WebSocket } from 'ws'
import { LocalStorage } from 'node-localstorage'
import { OpenSeaListBot } from './Classes/APIBots/OpenSeaListBot'
import { OpenSeaSaleBot } from './Classes/APIBots/OpenSeaSaleBot'
import { OpenSeaEventsPollBot } from './Classes/APIBots/OpenSeaEventsPollBot'
import {
  waitForStudioContracts,
  waitForEngineContracts,
} from './Classes/APIBots/utils'

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
// const API_POLL_TIME_MS = 10000
// const reservoirListLimit = 50
// const reservoirSaleLimit = 100

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

// const initReservoirBots = async () => {
//   const studioContracts = await waitForStudioContracts()
//   const engineContracts = await waitForEngineContracts()

//   const allContracts = Object.values(CORE_CONTRACTS)
//     .concat(Object.values(COLLAB_CONTRACTS))
//     .concat(Object.values(EXPLORATIONS_CONTRACTS))
//     .concat(studioContracts ?? [])
//     .concat(engineContracts ?? [])

//   type ReservoirContractSetResponse =
//     paths['/contracts-sets/v1']['post']['responses']['200']['schema']

//   const response = await axios.request<ReservoirContractSetResponse>({
//     method: 'POST',
//     url: 'https://api.reservoir.tools/contracts-sets/v1',
//     headers: {
//       accept: '*/*',
//       'content-type': 'application/json',
//       'x-api-key': process.env.RESERVOIR_API_KEY,
//     },
//     data: { contracts: allContracts },
//   })

//   // const contractSetID = response.data.contractsSetId

//   // List endpoint lets you use contractSet param which is very nice
//   // const listBot = new ReservoirListBot(
//   //   `https://api.reservoir.tools/orders/asks/v5?contractsSetId=${contractSetID}&sortBy=createdAt&limit=${reservoirListLimit}&normalizeRoyalties=true`,
//   //   API_POLL_TIME_MS,
//   //   discordClient,
//   //   {
//   //     Accept: 'application/json',
//   //     'x-api-key': process.env.RESERVOIR_API_KEY,
//   //   }
//   // )
//   // botsToCleanup.push(listBot)

//   // Sadly sales endpoint does not support contractSet param yet - need to batch by 20 contracts
//   const RESERVOIR_CONTRACT_LIMIT = 20
//   const numBotInstances = Math.ceil(
//     allContracts.length / RESERVOIR_CONTRACT_LIMIT
//   )
//   for (let i = 0; i < numBotInstances; i++) {
//     const start = i * RESERVOIR_CONTRACT_LIMIT
//     const end = start + RESERVOIR_CONTRACT_LIMIT
//     const saleParams =
//       'contract=' + allContracts.slice(start, end).join('&contract=')

//     // const saleBot = new ReservoirSaleBot(
//     //   `https://api.reservoir.tools/sales/v4?${saleParams}&limit=${reservoirSaleLimit}`,
//     //   API_POLL_TIME_MS + i * 3000,
//     //   discordClient,
//     //   {
//     //     Accept: 'application/json',
//     //     'x-api-key': process.env.RESERVOIR_API_KEY,
//     //   },
//     //   abTwitterBot
//     // )
//     // botsToCleanup.push(saleBot)
//   }
// }

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

/**
 * OpenSea Stream integration with robust error handling and reconnection logic
 *
 * This implementation addresses the common 502 "Bad Gateway" errors from OpenSea's WebSocket stream API
 * by implementing:
 *
 * 1. **Automatic Reconnection**: Exponential backoff with jitter (5s → 10s → 20s → ... up to 5 minutes)
 * 2. **Error Detection**: Specific handling for 502 errors with contextual logging
 * 3. **Connection Monitoring**: Health checks every minute with connection stats
 * 4. **Graceful Degradation**: Falls back to API polling when max reconnections reached
 * 5. **Configuration**: Environment variables for customizing reconnection behavior
 * 6. **Resource Management**: Proper cleanup of timers and connections on shutdown
 *
 * Debug access: `getOpenSeaConnectionStats()` in Node.js console
 */

// WebSocket connection management
interface ConnectionState {
  isConnected: boolean
  reconnectAttempts: number
  lastError?: Error
  lastConnectTime?: number
}

const connectionState: ConnectionState = {
  isConnected: false,
  reconnectAttempts: 0,
}

// Configuration with environment variable overrides
const MAX_RECONNECT_ATTEMPTS = parseInt(
  process.env.OPENSEA_MAX_RECONNECT_ATTEMPTS || '10'
)
const INITIAL_RECONNECT_DELAY = parseInt(
  process.env.OPENSEA_INITIAL_RECONNECT_DELAY || '5000'
) // 5 seconds
const MAX_RECONNECT_DELAY = parseInt(
  process.env.OPENSEA_MAX_RECONNECT_DELAY || '300000'
) // 5 minutes
const CONNECTION_HEALTH_CHECK_INTERVAL = parseInt(
  process.env.OPENSEA_HEALTH_CHECK_INTERVAL || '60000'
) // 1 minute

let openseaStreamClient: OpenSeaStreamClient
let reconnectTimeout: NodeJS.Timeout | null = null
let healthCheckInterval: NodeJS.Timeout | null = null

// Calculate exponential backoff delay with jitter
function getReconnectDelay(attemptNumber: number): number {
  const exponentialDelay = Math.min(
    INITIAL_RECONNECT_DELAY * Math.pow(2, attemptNumber),
    MAX_RECONNECT_DELAY
  )
  // Add jitter (±25% randomization) to prevent thundering herd
  const jitter = exponentialDelay * 0.25 * (Math.random() * 2 - 1)
  return Math.max(1000, exponentialDelay + jitter)
}

// Initialize OpenSea Stream Client with error handling
function initializeOpenSeaStreamClient(): OpenSeaStreamClient {
  console.log('Initializing OpenSea Stream Client...')

  const client = new OpenSeaStreamClient({
    token: process.env.OPENSEA_API_KEY ?? '',
    connectOptions: {
      transport: WebSocket,
      sessionStorage: LocalStorage,
    },
    onError: (error: unknown) => {
      console.error('❌ OpenSea Stream Client error:', error)
      connectionState.lastError = error as Error
      connectionState.isConnected = false

      // Check if it's a 502 error specifically and provide context
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      if (
        errorMessage.includes('502') ||
        errorMessage.includes('Bad Gateway')
      ) {
        console.log('🚨 Detected 502 Bad Gateway error - OpenSea server issue')
        console.log('   This is typically caused by:')
        console.log(
          "   • OpenSea's WebSocket gateway unable to reach backend services"
        )
        console.log('   • Temporary server overload or maintenance')
        console.log('   • Network issues between gateway and backend')
        console.log(
          '   ✅ Automatic reconnection will be attempted with exponential backoff'
        )
      }

      // Schedule reconnection for connection errors
      if (
        errorMessage.includes('WebSocket') ||
        errorMessage.includes('Connection') ||
        errorMessage.includes('502')
      ) {
        scheduleReconnection()
      }
    },
  })

  // The OpenSeaStreamClient handles connection internally using Phoenix channels
  // We'll rely on the onError callback and add additional monitoring
  console.log('✅ OpenSea Stream Client initialized with error handling')
  connectionState.isConnected = true
  connectionState.reconnectAttempts = 0
  connectionState.lastConnectTime = Date.now()

  // Start health check monitoring
  if (!healthCheckInterval) {
    startHealthCheckMonitoring()
  }

  return client
}

// Schedule reconnection with exponential backoff
function scheduleReconnection() {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout)
  }

  if (connectionState.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error(
      `❌ Max reconnection attempts (${MAX_RECONNECT_ATTEMPTS}) reached. Stopping reconnection attempts.`
    )
    console.log('📊 Falling back to API polling only for OpenSea events')
    return
  }

  const delay = getReconnectDelay(connectionState.reconnectAttempts)
  connectionState.reconnectAttempts++

  console.log(
    `🔄 Scheduling OpenSea WebSocket reconnection attempt ${
      connectionState.reconnectAttempts
    }/${MAX_RECONNECT_ATTEMPTS} in ${delay / 1000}s...`
  )

  reconnectTimeout = setTimeout(() => {
    console.log(
      `🔄 Attempting OpenSea WebSocket reconnection (attempt ${connectionState.reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`
    )
    try {
      // Reinitialize the stream client
      openseaStreamClient = initializeOpenSeaStreamClient()
      setupStreamEventHandlers()
    } catch (error) {
      console.error('❌ Failed to reinitialize OpenSea Stream Client:', error)
      scheduleReconnection()
    }
  }, delay)
}

// Health check monitoring
function startHealthCheckMonitoring() {
  healthCheckInterval = setInterval(() => {
    const now = Date.now()
    const timeSinceLastConnect = connectionState.lastConnectTime
      ? now - connectionState.lastConnectTime
      : Infinity

    if (!connectionState.isConnected) {
      console.log(
        '⚠️  OpenSea WebSocket health check: Connection lost, reconnection should be in progress'
      )
    } else if (timeSinceLastConnect > 600000) {
      // 10 minutes
      console.log(
        '✅ OpenSea WebSocket health check: Connection stable for',
        Math.round(timeSinceLastConnect / 60000),
        'minutes'
      )
    }

    // Log connection stats
    if (connectionState.reconnectAttempts > 0) {
      console.log(
        `📊 OpenSea WebSocket stats: ${
          connectionState.reconnectAttempts
        } reconnection attempts, currently ${
          connectionState.isConnected ? 'connected' : 'disconnected'
        }`
      )
    }
  }, CONNECTION_HEALTH_CHECK_INTERVAL)
}

// Setup stream event handlers
function setupStreamEventHandlers() {
  // Note: OpenSeaStreamClient doesn't expose removeAllListeners
  // Duplicate listeners are handled internally by the Phoenix channels

  // Your existing event handlers with additional error handling
  openseaStreamClient.onItemListed('*', async (event) => {
    if (!PRODUCTION_MODE) {
      return
    }
    try {
      // Get all contracts (ensures async contracts are loaded)
      const allContracts = Object.values(CORE_CONTRACTS)
        .concat(Object.values(COLLAB_CONTRACTS))
        .concat(Object.values(EXPLORATIONS_CONTRACTS))
        .concat(STUDIO_CONTRACTS)
        .concat(ENGINE_CONTRACTS)

      if (event.payload && event.payload.item && event.payload.item.nft_id) {
        const nftId = event.payload.item.nft_id

        if (isTrackedContract(nftId, allContracts)) {
          // Process the listing with the old OpenSeaListBot for now
          // This is the primary source for listings
          openSeaListBot.handleListingEvent(event).catch((err) => {
            console.error('Error processing OpenSea listing event:', err)
          })
        }
      }
    } catch (error) {
      console.error('Error handling OpenSea listing event:', error)
    }
  })

  openseaStreamClient.onItemSold('*', async (event) => {
    if (!PRODUCTION_MODE) {
      return
    }
    try {
      // Get all contracts (ensures async contracts are loaded)
      const allContracts = Object.values(CORE_CONTRACTS)
        .concat(Object.values(COLLAB_CONTRACTS))
        .concat(Object.values(EXPLORATIONS_CONTRACTS))
        .concat(STUDIO_CONTRACTS)
        .concat(ENGINE_CONTRACTS)

      if (event.payload && event.payload.item && event.payload.item.nft_id) {
        const nftId = event.payload.item.nft_id

        if (isTrackedContract(nftId, allContracts)) {
          // Parse the NFT ID to get contract and token info
          const parts = nftId.split('/')
          const contractAddress = parts[1]?.toLowerCase()
          const tokenId = parts[2]

          // Register this sale with the polling bot to avoid duplicate processing
          if (openSeaEventsBot && event.payload.transaction) {
            const seller = event.payload.maker.address || ''
            const buyer = event.payload.taker.address || ''
            openSeaEventsBot.registerStreamSale(
              event.payload.transaction.hash,
              contractAddress,
              tokenId,
              seller,
              buyer
            )
          }

          // Process the sale with the old OpenSeaSaleBot for now
          // This is the primary source for sales
          openSeaSaleBot.handleSaleEvent(event).catch((err: any) => {
            console.error('Error processing OpenSea sale event:', err)
          })
        }
      }
    } catch (error) {
      console.error('Error handling OpenSea sale event:', error)
    }
  })
}

// Utility function to get connection statistics
function getOpenSeaConnectionStats() {
  return {
    isConnected: connectionState.isConnected,
    reconnectAttempts: connectionState.reconnectAttempts,
    lastError: connectionState.lastError?.message,
    lastConnectTime: connectionState.lastConnectTime,
    uptime: connectionState.lastConnectTime
      ? Date.now() - connectionState.lastConnectTime
      : 0,
    config: {
      maxReconnectAttempts: MAX_RECONNECT_ATTEMPTS,
      initialReconnectDelay: INITIAL_RECONNECT_DELAY,
      maxReconnectDelay: MAX_RECONNECT_DELAY,
      healthCheckInterval: CONNECTION_HEALTH_CHECK_INTERVAL,
    },
  }
}

// Expose stats for debugging (global for console access)
if (typeof global !== 'undefined') {
  ;(global as any).getOpenSeaConnectionStats = getOpenSeaConnectionStats
}

// Initialize the stream client
console.log('Starting OpenSea WebSocket Stream integration...')
openseaStreamClient = initializeOpenSeaStreamClient()
setupStreamEventHandlers()

// Log configuration
console.log(
  `OpenSea Stream Config: Max reconnects=${MAX_RECONNECT_ATTEMPTS}, Initial delay=${INITIAL_RECONNECT_DELAY}ms, Max delay=${MAX_RECONNECT_DELAY}ms`
)

// OpenSea Stream Bots - Primary handlers, API polling for sales backfill
const openSeaListBot = new OpenSeaListBot(discordClient)
const openSeaSaleBot = new OpenSeaSaleBot(discordClient, abTwitterBot) // Primary sales handler
botsToCleanup.push(openSeaListBot)
botsToCleanup.push(openSeaSaleBot)

// Global reference to the polling bot for stream integration
let openSeaEventsBot: OpenSeaEventsPollBot | null = null

// Initialize new OpenSea API polling bots
const initOpenSeaApiPollingBots = async () => {
  console.log('Initializing OpenSea API polling bots...')

  // Wait for contracts to be loaded
  const studioContracts = await waitForStudioContracts()
  const engineContracts = await waitForEngineContracts()

  // Get all contracts we care about
  const allContracts = Object.values(CORE_CONTRACTS)
    .concat(Object.values(COLLAB_CONTRACTS))
    .concat(Object.values(EXPLORATIONS_CONTRACTS))
    .concat(studioContracts)
    .concat(engineContracts)

  console.log(
    `Tracking ${allContracts.length} contracts for OpenSea API polling`
  )

  // OpenSea API configuration
  const OPENSEA_API_BASE = 'https://api.opensea.io/api/v2/events'
  const API_POLL_TIME_MS = 10000 // Poll every 30 seconds (less frequent since it's backfill)
  const headers = {
    Accept: 'application/json',
    'x-api-key': process.env.OPENSEA_API_KEY,
  }

  // Initialize OpenSea API Events Bot (SALES ONLY for backfill)
  openSeaEventsBot = new OpenSeaEventsPollBot(
    OPENSEA_API_BASE, // Base URL, will be updated with parameters in constructor
    API_POLL_TIME_MS,
    discordClient,
    headers,
    abTwitterBot,
    allContracts,
    openSeaSaleBot
  )
  botsToCleanup.push(openSeaEventsBot)

  console.log(
    'OpenSea API polling bot initialized successfully (sales backfill only)'
  )
}

// Helper function to check if an OpenSea NFT ID contains any of our tracked contracts
const isTrackedContract = (
  nftId: string,
  contractsArray: string[]
): boolean => {
  // NFT ID format: "ethereum/0x2308742aa28cc460522ff855d24a365f99deba7b/7111"
  // Extract the contract address (middle part)
  const parts = nftId.split('/')
  if (parts.length !== 3) return false

  if (parts[0] !== 'ethereum') return false

  const contractAddress = parts[1].toLowerCase()

  // Check if this contract address is in our tracked contracts
  return contractsArray.some(
    (contract) => contract.toLowerCase() === contractAddress
  )
}

// Note: OpenSea Stream event handlers are now managed by setupStreamEventHandlers() above

// 8/28/2025 NOTE: We are migrating to OS API off of Reservoir
// Keeping these around for now in case we need to revert, but these will be deleted soon
// Instantiate API Pollers (if not in test mode)
// if (PRODUCTION_MODE) {
//   initReservoirBots()
// }

if (PRODUCTION_MODE) {
  attemptDiscordLogin()
  // Initialize OpenSea API polling bots after Discord login
  initOpenSeaApiPollingBots().catch((err) => {
    console.error('Error initializing OpenSea API polling bots:', err)
  })
}

// Cleanup function for OpenSea WebSocket connections
function cleanupOpenSeaConnections() {
  console.log('Cleaning up OpenSea WebSocket connections...')

  // Clear reconnection timeout
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout)
    reconnectTimeout = null
  }

  // Clear health check interval
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval)
    healthCheckInterval = null
  }

  // Disconnect OpenSea stream client gracefully
  if (openseaStreamClient) {
    try {
      openseaStreamClient.disconnect(() => {
        console.log('OpenSea WebSocket disconnected successfully')
      })
    } catch (error) {
      console.error('Error disconnecting OpenSea WebSocket:', error)
    }
  }

  // Reset connection state
  connectionState.isConnected = false
  connectionState.reconnectAttempts = 0
}

// Handle application shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Cleaning up...')
  // Cleanup OpenSea connections first
  cleanupOpenSeaConnections()
  // Cleanup all bots
  botsToCleanup.forEach((bot) => bot.cleanup())
  // Disconnect Discord client
  discordClient.destroy()
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Cleaning up...')
  // Cleanup OpenSea connections first
  cleanupOpenSeaConnections()
  // Cleanup all bots
  botsToCleanup.forEach((bot) => bot.cleanup())
  // Disconnect Discord client
  discordClient.destroy()
  process.exit(0)
})
