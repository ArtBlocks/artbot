const { APIPollBot } = require('./ApiPollBot')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

const {
  sendEmbedToSaleChannels,
  sendEmbedToListChannels,
  BAN_ADDRESSES,
} = require('../../Utils/activityTriager')

/** API Poller for Opensea List and Sale events */
class OpenseaAPIPollBot extends APIPollBot {
  /** Constructor just calls super
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   */
  constructor(apiEndpoint, refreshRateMs, bot, headers, contract = '') {
    apiEndpoint =
      apiEndpoint + '&occurred_after=' + (Date.now() / 1000).toFixed()
    super(apiEndpoint, refreshRateMs, bot, headers)
    this.contract = contract
  }

  /**
   * Parses and handles Opensea API endpoint data
   * Only sends events that are new
   * Response spec: https://docs.opensea.io/reference/retrieving-asset-events
   * @param {*} responseData - Dict parsed from API request json
   */
  handleAPIResponse(responseData) {
    let maxTime = 0
    for (const data of responseData.asset_events) {
      const eventTime = Date.parse(data.event_timestamp)
      // Only deal with event if it is new
      if (this.lastUpdatedTime < eventTime) {
        this.buildDiscordMessage(data)
      }

      // Save the time of the latest event from this batch
      if (maxTime < eventTime) {
        maxTime = eventTime
      }
    }

    // Update latest time vars if batch has new latest time
    if (maxTime > this.lastUpdatedTime) {
      this.lastUpdatedTime = maxTime

      this.apiEndpoint.split('&occurred_after=')[0] +
        '&occurred_after=' +
        this.lastUpdatedTime / 1000
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
    const tokenID = msg.asset.token_id
    const openseaURL = msg.asset.permalink

    // Event_type will either be SALE or LIST
    const eventType = msg.event_type

    // Construct price field (different info/verbiage depending on sale or list)
    let priceText, price, owner, ownerName, buyerText
    if (eventType === 'successful') {
      // Item sold, add 'Buyer' field
      buyerText =
        msg.winner_account.address +
        (msg.winner_account.user && msg.winner_account.user.username
          ? ' (' + msg.winner_account.user.username + ')'
          : '')

      priceText = 'Sale Price'
      price = msg.total_price
      owner = msg.seller.address
      ownerName =
        msg.seller.user && msg.seller.user.username
          ? msg.seller.user.username
          : ''
      embed.setColor(this.saleColor)
    } else {
      // Item Listed
      priceText = 'List Price'
      price = msg.ending_price
      owner = msg.from_account.address
      ownerName =
        msg.from_account.user && msg.seller.user.username
          ? msg.from_account.user.username
          : ''
      embed.setColor(this.listColor)
    }

    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping message propagation for ${owner}`)
      return
    }
    const sellerText = owner + (ownerName !== '' ? ' (' + ownerName + ')' : '')
    embed.addField('Seller (Opensea)', sellerText)
    embed.addField('Buyer', buyerText)
    embed.addField(
      priceText,
      parseInt(price) / 1000000000000000000 + 'ETH',
      true
    )

    // Get Art Blocks metadata response for the item.
    const tokenUrl =
      this.contract === ''
        ? `https://token.artblocks.io/${tokenID}`
        : `https://token.artblocks.io/${this.contract}/${tokenID}`
    const artBlocksResponse = await fetch(tokenUrl)
    const artBlocksData = await artBlocksResponse.json()

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
    embed.setURL(openseaURL)
    if (artBlocksData.collection_name) {
      if (eventType.includes('successful')) {
        console.log(artBlocksData.name + ' SALE')
        sendEmbedToSaleChannels(this.bot, embed, artBlocksData)
      } else if (eventType.includes('created')) {
        console.log(artBlocksData.name + ' LIST')
        sendEmbedToListChannels(this.bot, embed, artBlocksData)
      }
    }
  }
}

module.exports.OpenseaAPIPollBot = OpenseaAPIPollBot
