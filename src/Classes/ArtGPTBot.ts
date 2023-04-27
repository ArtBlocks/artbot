import { Message } from 'discord.js'
import { AxiosError } from 'axios'

const { EmbedBuilder } = require('discord.js')
const axios = require('axios')

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
  lastRequestTimestamp: number
  currentRequestCount: number
  queryString = '?artgpt'

  constructor() {
    this.lastRequestTimestamp = Date.now()
    this.currentRequestCount = 0
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
      // TODO: Actually the message w/ GPT-3.5.
      const message = `
      Hi, I'm ArtBot! 
      
      I'm here to help you with your questions. 
      
      I'm still learning, so please be patient with me.
      
      This is what you asked me: "${query}"
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
