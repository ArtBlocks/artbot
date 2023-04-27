import { EmbedBuilder, ColorResolvable } from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
const fetch = require('node-fetch')
const projectConfig = require('../ProjectConfig/projectConfig').projectConfig

const CHANNEL_FOR_SALE_LISTINGS: string =
  projectConfig.chIdByName['for-sale-listings']
const CHANNEL_TRADE_SWAPS: string = projectConfig.chIdByName['trade-swaps']
const CHANNEL_BLOCK_TALK: string = projectConfig.chIdByName['block-talk']
const PROJECT_ALIASES = require('../ProjectConfig/project_aliases.json')

// ArtBot details..
const ARTBOT_USERNAME = 'artbot'
const ARTBOT_GREEN = 0x00ff00
const ARTBOT_WARNING = 0xffff00

// Returns a random color
function randomColor(): ColorResolvable {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

/**
 * Returns a message for ArtBot to return when being a GPT, or null if
 * ArtBot has nothing to say (something went wrong).
 * @param {*} msgContentLowercase
 * @param {*} msgAuthor
 * @param {*} artBotID
 * @param {*} channelID
 */
export async function artGPTResponse(
  msgContentLowercase: string,
  msgAuthor: string,
  artBotID: string,
  channelID: string
): Promise<string | EmbedBuilder | null> {
  /*
   * NOTE: It is important to check if the message author is the ArtBot
   *       Itself to avoid a recursive infinite loop.
   */
  if (msgAuthor == ARTBOT_USERNAME) {
    return null
  }

  // TODO: Handle the message w/ GPT-3.5.

  return (
    new EmbedBuilder()
      // Set the title of the field
      .setTitle('I am ArtBot GPT')
      // Set the color of the embed
      .setColor(randomColor())
      // Set the main content of the embed
      .setDescription(
        `
        Hi, I'm ArtBot! I'm here to help you with your question. I'm still learning, so please be patient with me.
        
        This is what you asked me: ${msgContentLowercase}
        `
      )
  )
}
