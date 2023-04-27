import { Message, EmbedBuilder } from 'discord.js'

import { PineconeClient } from '@pinecone-database/pinecone'
import { VectorDBQAChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
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

// Color consts
const ARTBOT_GREEN = 0x00ff00
const ARTBOT_WARNING = 0xffff00

// Rate limit constants
const MAX_REQUESTS_PER_HOUR = 10
const HOUR_IN_MILLISECONDS = 3600000

/**
 * Bot for handling GPT-3.5 powered requests.
 */
export class ArtGPTBot {
  queryString = '?artgpt'
  lastRequestTimestamp: number
  currentRequestCount: number
  isLangChainWarmedUp: boolean
  model: OpenAI
  pineconeClient: PineconeClient
  pineconeIndex: VectorOperationsApi | undefined // Initialized async
  vectorStore: PineconeStore | undefined // Initialized async
  langChain: VectorDBQAChain | undefined // Initialized async

  constructor() {
    this.lastRequestTimestamp = Date.now()
    this.currentRequestCount = 0
    // expect this to be set to `true` within initializeLangchain()
    this.isLangChainWarmedUp = false
    this.model = new OpenAI()
    // Beef up the OpenAI
    this.model.modelName = 'gpt-3.5-turbo'
    this.model.temperature = 0
    this.model.maxTokens = 2048
    this.pineconeClient = new PineconeClient()
    this.initializeLangchain()
  }

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
      k: 5,
      // Can turn this on (and log `response.sourceDocuments`) for debuggings purposes.
      returnSourceDocuments: false,
    })

    // We are now warmed up!
    this.isLangChainWarmedUp = true
  }

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
    if (content.length <= this.queryString.length) {
      // Validate request format
      const message = `
      Invalid format, enter ${this.queryString} followed by the query for ArtGPT.
  `
      this.sendEmbedReply(msg, this.queryString, ARTBOT_WARNING, message)
      return
    } else if (!this.isLangChainWarmedUp || !this.langChain) {
      // Validate warm-up
      const message = `
      I'm sorry, I'm still warming up.

      Please try again in a few minutes.
  `
      this.sendEmbedReply(msg, this.queryString, ARTBOT_WARNING, message)
      return
    } else if (this.isRateLimited() === true) {
      // Validate rate-limit
      const message = `
      I'm sorry, I'm rate-limited right now.

      I currently can only process ${MAX_REQUESTS_PER_HOUR} requests per hour.
      
      Please try again later.
  `
      this.sendEmbedReply(msg, this.queryString, ARTBOT_WARNING, message)
      return
    } else {
      // Give a "I'm thinking response" while we wait for the response.
      this.sendEmbedReply(
        msg,
        this.queryString,
        ARTBOT_GREEN,
        "Your question has been recieved! I'm working on an answer..."
      )

      // Query the langchain
      let response = await this.langChain.call({ query: query })
      // Summarize response to be less than ARTBOT_MAX_CHARS_RESPONSE if it is too long.
      if (response.text.length > ARTBOT_MAX_CHARS_RESPONSE) {
        console.log('Summarizing response...')
        response = await this.langChain.call({
          query: `
        Please summarize the following response to be less than ${ARTBOT_MAX_CHARS_RESPONSE} characters:
        ---
        ${query}
        `,
        })
      }

      // Provide the real response.
      const message = `
      *NOTE: I am still in beta, my answers may be wrong.*

      ${response.text}
      `
      this.sendEmbedReply(msg, this.queryString, ARTBOT_GREEN, message)
    }
  }

  async sendEmbedReply(
    msg: Message,
    title: string,
    color: number,
    description: string
  ) {
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color)
      .setDescription(description)

    await msg.reply({ embeds: [embed] })
  }
}
