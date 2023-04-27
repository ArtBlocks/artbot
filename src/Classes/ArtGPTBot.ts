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
    this.model.temperature = 0.1 // TODO: Make this configurable
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
      k: 1,
      returnSourceDocuments: true,
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
      this.sendEmbed(msg, this.queryString, ARTBOT_WARNING, message)
      return
    } else if (!this.isLangChainWarmedUp || !this.langChain) {
      // Validate warm-up
      const message = `
      I'm sorry, I'm still warming up.

      Please try again in a few minutes.
  `
      this.sendEmbed(msg, this.queryString, ARTBOT_WARNING, message)
      return
    } else if (this.isRateLimited() === true) {
      // Validate rate-limit
      const message = `
      I'm sorry, I'm rate-limited right now.

      I currently can only process ${MAX_REQUESTS_PER_HOUR} requests per hour.
      
      Please try again later.
  `
      this.sendEmbed(msg, this.queryString, ARTBOT_WARNING, message)
      return
    } else {
      const response = await this.langChain.call({ query: query })
      // TODO: Actually the message w/ GPT-3.5.
      const message = `
      Beep boop bop ... I'm still learning, so please be patient with me.
      
      *This is what you asked me:*
      "${query}"

      *Here is my response:*
      ${response.text}

      *Here are the source documents I used to generate this response:*
      ${
        response.sourceDocuments.length > 0
          ? JSON.stringify(response.sourceDocuments)
          : 'I made it up...'
      }
      `
      this.sendEmbed(msg, this.queryString, ARTBOT_GREEN, message)
    }
  }

  async sendEmbed(
    msg: Message,
    title: string,
    color: number,
    description: string
  ) {
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color)
      .setDescription(description)

    await msg.channel.send({ embeds: [embed] })
  }
}
