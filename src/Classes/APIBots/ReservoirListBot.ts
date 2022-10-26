import { Client } from 'discord.js'

const { APIPollBot } = require('./ApiPollBot')
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const {
  sendEmbedToListChannels,
  BAN_ADDRESSES,
} = require('../../Utils/activityTriager')

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
    headers: any,
    contract = ''
  ) {
    super(apiEndpoint, refreshRateMs, bot, headers)
    this.contract = contract
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
  async handleAPIResponse(responseData: any) {
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
   * @param {*} msg - Dict of event data from API response
   */
  async buildDiscordMessage(msg: any) {
    // Create embed we will be sending
    const embed = new MessageEmbed()

    // Parsing message to get info
    const tokenID = msg.tokenSetId.split(':')[2]
    const contract = msg.contract
    const priceText = 'List Price'
    const price = msg.price.amount.decimal
    const currency = msg.price.currency.symbol
    const owner = msg.maker
    const platform = msg.source.name

    embed.setColor(this.listColor)

    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping message propagation for ${owner}`)
      return
    }
    const sellerText = await this.ensOrAddress(msg.maker)
    const baseABProfile = 'https://www.artblocks.io/user/'
    const sellerProfile = baseABProfile + owner
    embed.addField(`Seller (${platform})`, `[${sellerText}](${sellerProfile})`)

    embed.addField(priceText, `${price} ${currency}`, true)

    // Get Art Blocks metadata response for the item.
    const tokenUrl =
      this.contract === ''
        ? `https://token.artblocks.io/${tokenID}`
        : `https://token.artblocks.io/${this.contract}/${tokenID}`
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

    let platformUrl = ''
    switch (platform.toLowerCase()) {
      case 'opensea':
        platformUrl = this.buildOpenseaURL(contract, tokenID)
        break
      case 'looksrare':
        platformUrl = this.buildLooksRareURL(contract, tokenID)
        break
      case 'x2y2':
        platformUrl = this.buildX2Y2URL(contract, tokenID)
        break
      default:
        platformUrl = artBlocksData.external_url
        break
    }

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
