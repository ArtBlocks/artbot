const { APIPollBot } = require('./ApiPollBot')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const {
  sendEmbedToSaleChannels,
  BAN_ADDRESSES,
} = require('../../Utils/activityTriager')
const { getENSName } = require('./utils')
const { ethers } = require('ethers')
/** API Poller for Reservoir Sale events */
class ReservoirSaleBot extends APIPollBot {
  /** Constructor just calls super
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   */
  constructor(apiEndpoint, refreshRateMs, bot, headers, contract = '') {
    apiEndpoint =
      apiEndpoint + '&startTimestamp=' + (Date.now() / 1000).toFixed()
    super(apiEndpoint, refreshRateMs, bot, headers)
    this.contract = contract
    this.lastUpdatedTime = (this.lastUpdatedTime / 1000).toFixed()
    this.saleIds = new Set()
  }

  /**
   * Parses and handles Opensea API endpoint data
   * Only sends events that are new
   * Response spec: https://docs.reservoir.tools/reference/getsalesbulkv1
   * @param {*} responseData - Dict parsed from API request json
   */
  handleAPIResponse(responseData) {
    let maxTime = 0
    for (const data of responseData.sales) {
      const eventTime = data.timestamp
      // Only deal with event if it is new and unique saleId
      if (this.lastUpdatedTime < eventTime && !this.saleIds.has(data.saleId)) {
        this.buildDiscordMessage(data)
        this.saleIds.add(data.saleId)
      }

      // Save the time of the latest event from this batch
      if (maxTime < eventTime) {
        maxTime = eventTime
      }
    }

    // Update latest time vars if batch has new latest time
    if (maxTime > this.lastUpdatedTime) {
      this.lastUpdatedTime = maxTime

      this.apiEndpoint.split('&startTimestamp=')[0] +
        '&startTimestamp=' +
        this.lastUpdatedTime
    }
  }

  /**
   * Handles constructing and sending Discord embed message
   * OS API Spec: https://docs.opensea.io/reference/retrieving-asset-events
   * @param {*} msg - Dict of event data from API response
   */
  async buildDiscordMessage(msg) {
    // Create embed we will be sending
    const embed = new MessageEmbed()
    // Parsing Opensea message to get info
    const tokenID = msg.token.tokenId
    // const openseaURL = msg.asset.permalink

    // Event_type will either be SALE or LIST
    const eventType = 'successful'

    let priceText = 'Sale Price'
    let price = msg.price
    let owner = msg.from
    let platform = msg.orderSource
    embed.setColor(this.saleColor)

    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping message propagation for ${owner}`)
      return
    }
    if (msg.from === ethers.ZERO_ADDRESS) {
      return
    }

    let sellerText = await this.ensOrAddress(msg.from)
    let buyerText = await this.ensOrAddress(msg.to)
    if (platform.toLowerCase() === 'opensea') {
      if (!sellerText.includes('.eth')) {
        const sellerOS = await this.osName(msg.from)
        sellerText =
          sellerOS === '' ? sellerText : `${sellerText} (OS: ${sellerOS})`
      }
      if (!buyerText.includes('.eth')) {
        const buyerOS = await this.osName(msg.to)
        buyerText = buyerOS === '' ? buyerText : `${buyerText} (OS: ${buyerOS})`
      }
    }

    const baseABProfile = 'https://www.artblocks.io/user/'
    const sellerProfile = baseABProfile + owner
    const buyerProfile = baseABProfile + msg.to
    embed.addField(`Seller (${platform})`, `[${sellerText}](${sellerProfile})`)
    embed.addField('Buyer', `[${buyerText}](${buyerProfile})`)

    const currency = msg.orderSide === 'bid' ? 'WETH' : 'ETH'
    embed.addField(priceText, `${price} ${currency}`, true)

    // Get Art Blocks metadata response for the item.
    const tokenUrl =
      this.contract === ''
        ? `https://token.artblocks.io/${tokenID}`
        : `https://token.artblocks.io/${this.contract}/${tokenID}`
    const artBlocksResponse = await fetch(tokenUrl)
    const artBlocksData = await artBlocksResponse.json()

    let platformUrl = ''
    switch (platform.toLowerCase()) {
      case 'opensea':
        platformUrl = this.buildOpenseaURL(
          msg.token.contract,
          msg.token.tokenId
        )
        break
      case 'looksrare':
        platformUrl = this.buildLooksRareURL(
          msg.token.contract,
          msg.token.tokenId
        )
        break
      case 'x2y2':
        platformUrl = this.buildX2Y2URL(msg.token.contract, msg.token.tokenId)
        break
      default:
        platformUrl = artBlocksData.external_url
        break
    }

    // Update thumbnail image to use larger variant from Art Blocks API.
    embed.setThumbnail(artBlocksData.image)

    // Add inline field for viewing live script on Art Blocks.
    embed.addField(
      'Live Script',
      `[view on artblocks.io](${artBlocksData.external_url})`,
      true
    )
    // Update to remove author name and to reflect this info in piece name
    // rather than token number as the title and URL field..
    embed.author = null
    embed.setTitle(`${artBlocksData.name} - ${artBlocksData.artist}`)
    embed.setURL(platformUrl)
    if (artBlocksData.collection_name) {
      console.log(artBlocksData.name + ' SALE')
      sendEmbedToSaleChannels(this.bot, embed, artBlocksData)
    }
  }
}

module.exports.ReservoirSaleBot = ReservoirSaleBot
