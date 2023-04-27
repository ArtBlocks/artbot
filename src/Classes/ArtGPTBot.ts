import { Message, ColorResolvable } from 'discord.js'
import { AxiosError } from 'axios'

const { EmbedBuilder } = require('discord.js')
const axios = require('axios')

// Returns a random color
function randomColor(): ColorResolvable {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

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

  async handleRequest(msg: Message) {
    let content = msg.content
    if (content.length <= this.queryString.length) {
      msg.channel.send(
        `Invalid format, enter ${this.queryString} followed by the query for ArtGPT.`
      )
      return
    }

    // TODO: Validate rate-limit

    // TODO: Actually the message w/ GPT-3.5.

    msg.channel.send(
      new EmbedBuilder()
        // Set the title of the field
        .setTitle('I am ArtBot GPT')
        // Set the color of the embed
        .setColor(randomColor())
        // Set the main content of the embed
        .setDescription(
          `
        Hi, I'm ArtBot! 
        
        I'm here to help you with your questions. 
        
        I'm still learning, so please be patient with me.
        
        This is what you asked me: ${content}
        `
        )
    )
  }
}
