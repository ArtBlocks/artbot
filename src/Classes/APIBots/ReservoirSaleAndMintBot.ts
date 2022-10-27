import { Client } from 'discord.js'
import { mintBot } from '../..'
import { getTokenApiUrl } from './utils'

const { APIPollBot } = require('./ApiPollBot')
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const {
  sendEmbedToSaleChannels,
  BAN_ADDRESSES,
} = require('../../Utils/activityTriager')

type ReservoirSale = {
  from: string
  to: string
  saleId: string
  orderSource: string
  orderKind: string
  token: {
    contract: string
    tokenId: string
  }
  price: {
    currency: {
      symbol: string
    }
    amount: {
      decimal: number
    }
  }
  timestamp: number
}

type ReservoirSaleResponse = {
  sales: ReservoirSale[]
  continuation: string
}

/** API Poller for Reservoir Sale events */
export class ReservoirSaleAndMintBot extends APIPollBot {
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
  async handleAPIResponse(responseData: ReservoirSaleResponse) {
    let maxTime = 0
    for (const data of responseData.sales) {
      const eventTime = data.timestamp
      // Only deal with event if it is new and unique saleId
      if (this.lastUpdatedTime < eventTime && !this.saleIds.has(data.saleId)) {
        this.buildDiscordMessage(data).catch((err) => {
          console.log('Error sending sale message', err)
        })
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
   * @param {*} sale - Dict of event data from API response
   */
  async buildDiscordMessage(sale: ReservoirSale) {
    // Create embed we will be sending
    const embed = new MessageEmbed()
    // Parsing Reservoir sale message to get info
    const tokenID = sale.token.tokenId

    const priceText = 'Sale Price'
    const price = sale.price.amount.decimal
    const currency = sale.price.currency.symbol
    const owner = sale.from
    const platform = sale.orderSource.toLowerCase()
    embed.setColor(this.saleColor)

    if (sale.orderKind === 'mint') {
      // Add mint event to mintBot and return
      mintBot?.addMint(sale.token.contract, sale.token.tokenId, msg.to)
      return
    }

    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping message propagation for ${owner}`)
      return
    }
    if (sale.orderSource.toLowerCase().includes('looksrare')) {
      console.log(`Skipping message propagation for LooksRare`)
      return
    }

    // Get Art Blocks metadata response for the item.
    const tokenUrl = getTokenApiUrl(sale.token.contract, tokenID)
    const artBlocksResponse = await axios.get(tokenUrl)
    const artBlocksData = artBlocksResponse?.data

    let sellerText = await this.ensOrAddress(sale.from)
    let buyerText = await this.ensOrAddress(sale.to)
    let platformUrl = artBlocksData.external_url

    if (platform.includes('opensea')) {
      if (!sellerText.includes('.eth')) {
        const sellerOS = await this.osName(sale.from)
        sellerText =
          sellerOS === '' ? sellerText : `${sellerText} (OS: ${sellerOS})`
      }
      if (!buyerText.includes('.eth')) {
        const buyerOS = await this.osName(sale.to)
        buyerText = buyerOS === '' ? buyerText : `${buyerText} (OS: ${buyerOS})`
      }

      platformUrl = this.buildOpenseaURL(
        sale.token.contract,
        sale.token.tokenId
      )
    } else if (platform.includes('looksrare')) {
      platformUrl = this.buildLooksRareURL(
        sale.token.contract,
        sale.token.tokenId
      )
    } else if (platform.includes('x2y2')) {
      platformUrl = this.buildX2Y2URL(sale.token.contract, sale.token.tokenId)
    }
    const baseABProfile = 'https://www.artblocks.io/user/'
    const sellerProfile = baseABProfile + owner
    const buyerProfile = baseABProfile + sale.to
    embed.addField(`Seller (${platform})`, `[${sellerText}](${sellerProfile})`)
    embed.addField('Buyer', `[${buyerText}](${buyerProfile})`)

    embed.addField(priceText, `${price} ${currency}`, true)

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
