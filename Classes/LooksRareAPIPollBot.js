const { APIPollBot } = require('./ApiPollBot')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

const {
  sendEmbedToSaleChannels,
  sendEmbedToListChannels,
  BAN_ADDRESSES,
} = require('../Utils/activityTriager')

/** API Poller for LooksRare List and Sale events */
class LooksRareAPIPollBot extends APIPollBot {
  /** Constructor just calls super
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   */
  constructor(apiEndpoint, refreshRateMs, bot) {
    super(apiEndpoint, refreshRateMs, bot)
    this.listColor = '#62DE7C'
    this.saleColor = '#9d77f7'
  }

  /**
   * Parses and handles LooksRare API endpoint data
   * Only sends events that are new
   * Response spec: https://looksrare.github.io/api-docs/#/Events/EventController.getEvents
   * @param {*} responseData - Dict parsed from API request json
   */
  handleAPIResponse(responseData) {
    let maxTime = 0
    for (const data of responseData.data) {
      const eventTime = Date.parse(data.createdAt)

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
    }
  }

  /**
   * Handles constructing and sending Discord embed message
   * LooksRare API Spec: https://looksrare.github.io/api-docs/#/Events/EventController.getEvents
   * @param {*} msg - Dict of event data from API response
   */
  async buildDiscordMessage(msg) {
    // Create embed we will be sending
    const embed = new MessageEmbed()

    // Parsing LooksRare message to get info
    const tokenID = msg.token.tokenId
    const looksRareURL = `https://looksrare.org/collections/${msg.token.collectionAddress}/${tokenID}`

    // Event_type will either be SALE or LIST
    const eventType = msg.type

    const owner = msg.from
    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping message propagation for ${owner}`)
      return
    }
    embed.addField('Seller (LooksRare)', owner)

    // Construct price field (different info/verbiage depending on sale or list)
    let priceText
    if (eventType === 'SALE') {
      // Item sold, add 'Buyer' field
      embed.addField('Buyer', msg.to)
      priceText = 'Sale Price'
      embed.setColor(this.saleColor)
    } else {
      // Item Listed
      priceText = 'List Price'
      embed.setColor(this.listColor)
    }
    const price = msg.order.price
    embed.addField(
      priceText,
      parseInt(price) / 1000000000000000000 + 'ETH',
      true
    )

    // Get Art Blocks metadata response for the item.
    const artBlocksResponse = await fetch(
      `https://token.artblocks.io/${tokenID}`
    )
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
    embed.setURL(looksRareURL)
    if (artBlocksData.collection_name) {
      if (eventType.includes('SALE')) {
        sendEmbedToSaleChannels(this.bot, embed, artBlocksData)
      } else if (eventType.includes('LIST')) {
        sendEmbedToListChannels(this.bot, embed, artBlocksData)
      }
    }
  }
}

module.exports.LooksRareAPIPollBot = LooksRareAPIPollBot
