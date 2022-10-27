import { Client } from 'discord.js'
import { getTokenApiUrl } from './utils'

const { APIPollBot } = require('./ApiPollBot')
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const {
  sendEmbedToListChannels,
  BAN_ADDRESSES,
} = require('../../Utils/activityTriager')

type ReservoirListing = {
  maker: string
  tokenSetId: string
  contract: string
  price: {
    currency: {
      symbol: string
    }
    amount: {
      decimal: number
    }
  }
  source: {
    name: string
    domain: string
    url: string
  }
  createdAt: string
}

type ReservoirListResponse = {
  orders: ReservoirListing[]
}

/** API Poller for Reservoir Sale events */
class ReservoirListBot extends APIPollBot {
  /** Constructor just calls super
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   */
  constructor(
    apiEndpoint: string,
    refreshRateMs: number,
    bot: Client,
    headers: any
  ) {
    super(apiEndpoint, refreshRateMs, bot, headers)
    this.listColor = '#407FDB'
    this.saleColor = '#62DE7C'
    this.lastUpdatedTime = this.lastUpdatedTime.toFixed()
  }

  /**
   * Parses and handles Reservoir API endpoint data
   * Only sends events that are new
   * Response spec: https://docs.reservoir.tools/reference/getordersasksv2
   * @param {*} responseData - Dict parsed from API request json
   */
  async handleAPIResponse(responseData: ReservoirListResponse) {
    let maxTime = 0
    for (const data of responseData.orders) {
      const eventTime = Date.parse(data.createdAt)
      // Only deal with event if it is new
      if (this.lastUpdatedTime < eventTime) {
        this.buildDiscordMessage(data).catch((err) => {
          console.log('Error sending listing message', err)
        })
      }

      // Save the time of the latest event from this batch
      if (maxTime < eventTime) {
        maxTime = eventTime
      }
    }

    // Update latest time vars if batch has new latest time
    if (maxTime > this.lastUpdatedTime) {
      this.lastUpdatedTime = maxTime
    }
  }

  /**
   * Handles constructing and sending Discord embed message
   * Reservoir API Spec: https://docs.reservoir.tools/reference/getordersasksv2
   * @param {*} listing - Dict of event data from API response
   */
  async buildDiscordMessage(listing: ReservoirListing) {
    // Create embed we will be sending
    const embed = new MessageEmbed()

    // Parsing message to get info
    const tokenID = listing.tokenSetId.split(':')[2]
    const priceText = 'List Price'
    const price = listing.price.amount.decimal
    const currency = listing.price.currency.symbol
    const owner = listing.maker
    const platform = listing.source.name

    embed.setColor(this.listColor)

    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping message propagation for ${owner}`)
      return
    }
    const sellerText = await this.ensOrAddress(listing.maker)
    const baseABProfile = 'https://www.artblocks.io/user/'
    const sellerProfile = baseABProfile + owner
    embed.addField(`Seller (${platform})`, `[${sellerText}](${sellerProfile})`)

    embed.addField(priceText, `${price} ${currency}`, true)

    // Get Art Blocks metadata response for the item.
    const tokenUrl = getTokenApiUrl(listing.contract, tokenID)
    const artBlocksResponse = await axios.get(tokenUrl)
    const artBlocksData = artBlocksResponse?.data

    let curationStatus = artBlocksData?.curation_status
      ? artBlocksData.curation_status[0].toUpperCase() +
        artBlocksData.curation_status.slice(1).toLowerCase()
      : ''

    if (artBlocksData?.platform === 'Art Blocks x Pace') {
      curationStatus = 'AB x Pace'
    }
    // Update thumbnail image to use larger variant from Art Blocks API.
    embed.setThumbnail(artBlocksData.image)
    embed.addField('Collection', `${curationStatus}`, true)

    // Add inline field for viewing live script on Art Blocks.
    embed.addField(
      'Live Script',
      `[view on artblocks.io](${artBlocksData.external_url})`,
      true
    )

    const platformUrl = listing.source.url

    embed.author = null
    embed.setTitle(`${artBlocksData.name} - ${artBlocksData.artist}`)
    embed.setURL(platformUrl)
    if (artBlocksData.collection_name) {
      console.log(artBlocksData.name + ' LIST')
      sendEmbedToListChannels(this.bot, embed, artBlocksData)
    }
  }
}

module.exports.ReservoirListBot = ReservoirListBot
