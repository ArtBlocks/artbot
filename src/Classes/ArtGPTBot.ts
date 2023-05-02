import { Message, EmbedBuilder } from 'discord.js'

import { PineconeClient } from '@pinecone-database/pinecone'
import { VectorDBQAChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAIChat } from 'langchain/llms/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch'

// LLM Environment Variables
const PINECONE_API_KEY = process.env.PINECONE_API_KEY
const PINECONE_ENV = process.env.PINECONE_ENV
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME
// NOTE: OPENAI_API_KEY is not needed to be imported directly,
//       but it is assumed by Langchain to be available in `process.env`
//       so must be present in the .`env` file.

// ArtBot username
const ARTBOT_USERNAME = 'artbot'
const ARTBOT_MAX_CHARS_RESPONSE = 4000

// Discord consts
const DISCORD_INC_SERVER_ID = '822311470133542912'
const DISCORD_COMMUNITY_SERVER_ID = '411959613370400778'
const DISCORD_TEST_SERVER_ID = '785144843986665472'
const DISCORD_COMMUNITY_ARTIST_TECH_CHANNEL_ID = '909525641622347806'
const DISCORD_COMMUNITY_PARTNERSHIP_ARTISTS_CHANNEL_ID = '971541479333965824'

// Color consts
const ARTBOT_GREEN = 0x00ff00
const ARTBOT_WARNING = 0xffff00
const ARTBOT_ERROR = 0xff0000

// Rate limit constants
const MAX_REQUESTS_PER_HOUR = 50
const HOUR_IN_MILLISECONDS = 3600000

/**
 * Bot for handling GPT-3.5 powered requests.
 */
export class ArtGPTBot {
  queryString = '?artgpt'
  lastRequestTimestamp: number
  currentRequestCount: number
  isLangChainWarmedUp: boolean
  model: OpenAIChat
  pineconeClient: PineconeClient
  pineconeIndex: VectorOperationsApi | undefined // Initialized async
  vectorStore: PineconeStore | undefined // Initialized async
  langChain: VectorDBQAChain | undefined // Initialized async

  constructor() {
    this.lastRequestTimestamp = Date.now()
    this.currentRequestCount = 0
    // expect this to be set to `true` within initializeLangchain()
    this.isLangChainWarmedUp = false
    this.model = new OpenAIChat({
      modelName: 'gpt-3.5-turbo', // With valid API keys can also use 'gpt-4'
      temperature: 0,
      prefixMessages: [
        {
          role: 'system',
          content: `
          You are an software integration and project support assistant for 
          Art Blocks artists and Art Blocks Engine integration partners. 
          You have been trained on github repositories containing the Art Blocks 
          Solidity smart contracts and the documentation that covers: these smart 
          contracts, the Art Blocks APIs (for token metadata, live rendering, etc.), 
          and the processes for using these APIs, contracts, and tools.
          `,
        },
      ],
    })
    this.pineconeClient = new PineconeClient()
    this.initializeLangchain()
  }

  /**
   * Helper to initialize langchain setup.
   */
  async initializeLangchain() {
    // Validity check the environment variables
    if (!PINECONE_API_KEY) {
      console.error('PINECONE_API_KEY not found in environment variables.')
      return
    }
    if (!PINECONE_ENV) {
      console.error('PINECONE_ENV not found in environment variables.')
      return
    }
    if (!PINECONE_INDEX_NAME) {
      console.error('PINECONE_INDEX_NAME not found in environment variables.')
      return
    }

    // Initialize langchain setup
    await this.pineconeClient.init({
      apiKey: PINECONE_API_KEY,
      environment: PINECONE_ENV,
    })
    const pineconeIndex = this.pineconeClient.Index(PINECONE_INDEX_NAME)
    this.pineconeIndex = pineconeIndex
    this.vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    )
    this.langChain = VectorDBQAChain.fromLLM(this.model, this.vectorStore, {
      k: 2, // This is the number of documents to include as context (4 is default).
      returnSourceDocuments: true,
    })

    // We are now warmed up!
    this.isLangChainWarmedUp = true
  }

  /**
   * Helper to determine if the bot is currently rate-limited.
   */
  isRateLimited(): boolean {
    // Check if we're in a new hour
    if (Date.now() - this.lastRequestTimestamp > HOUR_IN_MILLISECONDS) {
      // If so, reset the request count
      this.lastRequestTimestamp = Date.now()
      this.currentRequestCount = 0
    }

    // Increment the request count
    this.currentRequestCount++

    // Check if we're over the request limit
    return this.currentRequestCount >= MAX_REQUESTS_PER_HOUR
  }

  /**
   * Helper to determine if the bot is being queries in valid server and channel.
   */
  inValidServerChannel(msg: Message): boolean {
    const serverID = msg.guild ? msg.guild.id : ''
    const channelID = msg.channel ? msg.channel.id : ''

    if (
      serverID == DISCORD_INC_SERVER_ID ||
      serverID == DISCORD_TEST_SERVER_ID
    ) {
      // Handle all messages in the Inc and test servers
      return true
    } else if (serverID == DISCORD_COMMUNITY_SERVER_ID) {
      // In the community server, only field reqeusts in the
      // #artist-tech and #partnership-artists channels for now
      if (
        channelID == DISCORD_COMMUNITY_ARTIST_TECH_CHANNEL_ID ||
        channelID == DISCORD_COMMUNITY_PARTNERSHIP_ARTISTS_CHANNEL_ID
      ) {
        return true
      }
    }
    return false
  }

  /**
   * Send an embed reply to a message.
   * @param msg The message to reply to.
   */
  async handleRequest(msg: Message) {
    /*
     * NOTE: It is important to check if the message author is the ArtBot
     *       Itself to avoid a recursive infinite loop.
     */
    if (msg.author.username == ARTBOT_USERNAME) {
      return null
    }

    const content = msg.content
    const query = content.substring(this.queryString.length + 1, content.length)
    if (this.inValidServerChannel(msg) === false) {
      // Validate server / channel
      this.sendWarningReply(
        msg,
        "I'm sorry, I'm not currently available in this server / channel."
      )
      return
    } else if (content.length <= this.queryString.length) {
      // Validate request format
      this.sendWarningReply(
        msg,
        `Invalid format, enter ${this.queryString} followed by the query for ArtGPT.`
      )
      return
    } else if (!this.isLangChainWarmedUp || !this.langChain) {
      // Validate warm-up
      const message = `
      I'm sorry, I'm still warming up.

      Please try again in a few minutes.
  `
      this.sendWarningReply(msg, message)
      return
    } else if (this.isRateLimited() === true) {
      // Validate rate-limit
      const message = `
      I'm sorry, I'm rate-limited right now.

      I currently can only process ${MAX_REQUESTS_PER_HOUR} requests per hour.
      
      Please try again later.
  `
      this.sendWarningReply(msg, message)
      return
    } else {
      // Give a "I'm thinking response" while we wait for the response.
      this.sendEmbedReply(
        msg,
        ARTBOT_GREEN,
        "Your question has been recieved! I'm working on an answer..."
      )

      // Query the langchain
      let response
      try {
        response = await this.langChain.call({ query: query })
      } catch (error) {
        console.error(`Error calling langchain: ${JSON.stringify(error)}`)
        console.error(
          `Error response data: ${JSON.stringify(error.response?.data)}`
        )
        this.sendErrorReply(msg)
        return
      }
      const sourceDocuments = response.sourceDocuments
      const sourceLocations = sourceDocuments.map((doc: any) => ({
        repoName: doc.metadata.repoName,
        fileName: doc.metadata.fileName,
      }))
      let sourceLocationsString = ''
      sourceLocations.forEach((location: any) => {
        sourceLocationsString += `
        - ${location.fileName} in ${location.repoName}
        `
      })

      // Summarize response to be less than ARTBOT_MAX_CHARS_RESPONSE if it is too long.
      if (
        response.text.length + sourceLocationsString.length >
        ARTBOT_MAX_CHARS_RESPONSE
      ) {
        console.log('Summarizing response...')
        try {
          response = await this.langChain.call({
            query: `
          Please summarize the following response to be less than ${
            ARTBOT_MAX_CHARS_RESPONSE - sourceLocationsString.length
          } characters:
          ---
          ${query}
          `,
          })
        } catch (error) {
          console.error(`Error summarizing with langchain: ${error}`)
          this.sendErrorReply(msg)
          return
        }
      }

      // Provide the real response.
      const message = `
      *NOTE: I am still in beta, my answers may be wrong.*

      ${response.text}

      ---

      *Source Documents:*
      ${sourceLocationsString}
      `
      this.sendEmbedReply(msg, ARTBOT_GREEN, message)
    }
  }

  /**
   * Send an embed reply to a message.
   * @param msg The message to reply to.
   * @param title The title of the embed.
   * @param color The color of the embed.
   * @param description The description of the embed.
   */
  async sendEmbedReply(msg: Message, color: number, description: string) {
    const embed = new EmbedBuilder()
      .setTitle(this.queryString)
      .setColor(color)
      .setDescription(description)

    await msg.reply({ embeds: [embed] })
  }

  /**
   * Send an warning reply to a message.
   * @param msg The message to reply to.
   */
  async sendWarningReply(msg: Message, warning: string) {
    this.sendEmbedReply(msg, ARTBOT_WARNING, warning)
  }

  /**
   * Send an error reply to a message.
   * @param msg The message to reply to.
   */
  async sendErrorReply(msg: Message) {
    this.sendEmbedReply(
      msg,
      ARTBOT_ERROR,
      "I'm sorry, I encountered an error. Please try again later."
    )
  }
}
