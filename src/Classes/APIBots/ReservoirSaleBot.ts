import axios from 'axios'
import { Client, EmbedBuilder } from 'discord.js'
import {
  BAN_ADDRESSES,
  sendEmbedToSaleChannels,
} from '../../Utils/activityTriager'
import { CollectionType } from '../MintBot'
import { APIPollBot } from './ApiPollBot'
import { TwitterBot } from '../TwitterBot'
import {
  getTokenApiUrl,
  isExplorationsContract,
  isEngineContract,
  getCollectionType,
  SALE_UTM,
  ensOrAddress,
  replaceVideoWithGIF,
  getTokenUrl,
  isStudioContract,
} from './utils'

type ReservoirSale = {
  from: string
  to: string
  saleId: string
  fillSource: string
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
      native: number
    }
  }
  timestamp: number
}

type ReservoirSaleResponse = {
  sales: ReservoirSale[]
  continuation: string
}

/** API Poller for Reservoir Sale events */
export class ReservoirSaleBot extends APIPollBot {
  saleIds: Set<string>
  twitterBot?: TwitterBot
  /** Constructor just calls super
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   * @param {TwitterBot} twitterBot - Optional TwitterBot instance for posting sale tweets
   */
  constructor(
    apiEndpoint: string,
    refreshRateMs: number,
    bot: Client,
    headers: any,
    twitterBot?: TwitterBot
  ) {
    apiEndpoint =
      apiEndpoint + '&startTimestamp=' + (Date.now() / 1000).toFixed()
    super(apiEndpoint, refreshRateMs, bot, headers)
    this.twitterBot = twitterBot
    this.lastUpdatedTime = Math.floor(this.lastUpdatedTime / 1000)
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
    const sales: { [id: string]: ReservoirSale[] } = {}
    for (const data of responseData.sales) {
      const eventTime = data.timestamp
      // Only deal with event if it is new and unique saleId
      if (this.lastUpdatedTime < eventTime && !this.saleIds.has(data.saleId)) {
        this.saleIds.add(data.saleId)
        // Only worrying about batch sales messages for Friendship Bracelets
        if (
          !isExplorationsContract(data.token.contract) ||
          parseInt(data.token.tokenId) / 1e6 > 1 // To make sure non-FB explorations aren't batched
        ) {
          this.buildDiscordMessage(data).catch((err) => {
            console.error('Error sending sale message', err)
          })
        } else {
          // Instantiate array for address if it doesn't exist yet
          if (!sales[data.to]) {
            sales[data.to] = []
          }
          sales[data.to].push(data)
        }
      }

      // Save the time of the latest event from this batch
      if (maxTime < eventTime) {
        maxTime = eventTime
      }
    }
    // Handle Explorations sales (may need to batch big sweeps)
    Object.keys(sales).forEach((user) => {
      if (sales[user].length > 1) {
        this.buildSweepDiscordMessage(sales[user]).catch((err) => {
          console.error('Error sending batch sale message', err)
        })
      } else {
        this.buildDiscordMessage(sales[user][0]).catch((err) => {
          console.error('Error sending sale message', err)
        })
      }
    })

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
    const embed = new EmbedBuilder()
    // Parsing Reservoir sale message to get info
    const tokenID = sale.token.tokenId

    if (sale.orderKind === 'mint') {
      return // Don't send mint events
    }
    const priceText = 'Sale Price'
    const price = sale.price.amount.decimal
    const currency = sale.price.currency.symbol
    const owner = sale.from
    let platform = sale.fillSource.toLowerCase()

    if (platform.includes('artblocks')) {
      embed.setColor(this.artblocksSaleColor)
      platform = 'Art Blocks <:lilsquig:1028047420636020786>'
    } else {
      embed.setColor(this.saleColor)
    }

    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping message propagation for ${owner}`)
      return
    }
    if (platform.toLowerCase().includes('looksrare')) {
      console.log(`Skipping message propagation for LooksRare`)
      return
    }

    // Get Art Blocks metadata response for the item.
    const tokenApiUrl = getTokenApiUrl(sale.token.contract, tokenID)
    const artBlocksResponse = await axios.get(tokenApiUrl)
    const artBlocksData = artBlocksResponse?.data

    const tokenUrl = getTokenUrl(
      artBlocksData.external_url,
      sale.token.contract,
      tokenID
    )

    let sellerText = await ensOrAddress(sale.from)
    let buyerText = await ensOrAddress(sale.to)
    const platformUrl = this.getPlatformUrl(
      platform,
      sale.token.contract,
      sale.token.tokenId,
      tokenUrl
    )

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
    }
    const baseABProfile = 'https://www.artblocks.io/user/'
    const sellerProfile = baseABProfile + owner + SALE_UTM
    const buyerProfile = baseABProfile + sale.to + SALE_UTM
    embed.addFields(
      {
        name: `Seller (${platform})`,
        value: `[${sellerText}](${sellerProfile})`,
      },
      {
        name: `Buyer`,
        value: `[${buyerText}](${buyerProfile})`,
      },
      {
        name: priceText,
        value: `${price} ${currency}`,
        inline: true,
      }
    )

    let title = `${artBlocksData.name} - ${artBlocksData.artist}`

    let curationStatus = artBlocksData?.curation_status
      ? artBlocksData.curation_status[0].toUpperCase() +
        artBlocksData.curation_status.slice(1).toLowerCase()
      : ''

    if (artBlocksData?.platform.includes('Art Blocks x Pace')) {
      curationStatus = 'AB x Pace'
    } else if (artBlocksData?.platform === 'Art Blocks × Bright Moments') {
      curationStatus = 'AB x Bright Moments'
    } else if (isExplorationsContract(sale.token.contract)) {
      curationStatus = 'Explorations'
    } else if (isStudioContract(sale.token.contract)) {
      curationStatus = 'Studio'
    } else if (isEngineContract(sale.token.contract)) {
      curationStatus = 'Engine'
      if (artBlocksData?.platform) {
        title = `${artBlocksData.platform} - ${title}`
      }
    }
    // Update thumbnail image to use larger variant from Art Blocks API.
    let assetUrl = artBlocksData?.preview_asset_url
    if (assetUrl && !assetUrl.includes('undefined')) {
      assetUrl = await replaceVideoWithGIF(assetUrl)
      embed.setThumbnail(assetUrl)
    }
    embed.addFields(
      {
        name: `Collection`,
        value: `${curationStatus}`,
        inline: true,
      },
      {
        name: 'Live Script',
        value: `[view on artblocks.io](${tokenUrl + SALE_UTM})`,
        inline: true,
      }
    )
    // Update to remove author name and to reflect this info in piece name
    // rather than token number as the title and URL field..
    embed.setTitle(title)
    if (platformUrl) {
      embed.setURL(platformUrl + SALE_UTM)
    }
    if (artBlocksData.collection_name) {
      console.log(artBlocksData.name + ' SALE')
      sendEmbedToSaleChannels(
        this.bot,
        embed,
        artBlocksData,
        await getCollectionType(sale.token.contract)
      )
    }

    // Post to Twitter if TwitterBot is available and sale meets criteria
    if (this.twitterBot && this.shouldTweetSale(sale, artBlocksData)) {
      try {
        await this.twitterBot.tweetSale({
          tokenName: artBlocksData.name,
          projectName: artBlocksData.collection_name,
          artist: artBlocksData.artist,
          salePrice: price,
          currency: currency,
          buyer: sale.to,
          seller: sale.from,
          assetUrl: assetUrl || artBlocksData.preview_asset_url,
          tokenUrl: tokenUrl,
          platform: platform
            .replace('<:lilsquig:1028047420636020786>', '')
            .trim(),
        })
      } catch (error) {
        console.error('Error posting sale to Twitter:', error)
      }
    }
  }

  /**
   * Determines whether a sale should be posted to Twitter
   * Currently filters out low-value sales and certain platforms
   * Can be customized to add more filtering criteria
   */
  private shouldTweetSale(sale: ReservoirSale, _artBlocksData: any): boolean {
    const price = sale.price.amount.decimal
    const currency = sale.price.currency.symbol

    // Filter out very low-value sales (less than 0.1 ETH)
    if (currency === 'ETH' && price < 0.1) {
      return false
    }

    // Filter out mint events (though these should already be filtered out)
    if (sale.orderKind === 'mint') {
      return false
    }

    // Could add more filters here, for example:
    // - Only certain collections
    // - Only sales above certain thresholds
    // - Only certain platforms

    return true
  }

  async buildSweepDiscordMessage(sales: ReservoirSale[]) {
    const sale0 = sales[0]

    if (BAN_ADDRESSES.has(sale0.to)) {
      console.log(`Skipping message propagation for ${sale0.to}`)
      return
    }
    // Create embed we will be sending
    const embed = new EmbedBuilder()

    const buyerText = await ensOrAddress(sale0.to)

    // Get sale 0 token info for thumbnail, etc
    const tokenUrl = getTokenApiUrl(sale0.token.contract, sale0.token.tokenId)
    const artBlocksResponse = await axios.get(tokenUrl)
    const artBlocksData = artBlocksResponse?.data
    let assetUrl = artBlocksData?.preview_asset_url
    if (assetUrl && !assetUrl.includes('undefined')) {
      assetUrl = await replaceVideoWithGIF(artBlocksData.preview_asset_url)
      embed.setThumbnail(assetUrl)
    }

    let totalCost = 0

    for (let i = 0; i < sales.length; i++) {
      const sale = sales[i]
      if (sale.orderKind === 'mint') {
        return // Don't send mint events
      }
      const tokenName =
        'Friendship Bracelets #' + (parseInt(sale.token.tokenId) % 1e6)
      const price = sale.price.amount.decimal
      const currency = sale.price.currency.symbol
      totalCost += sale.price.amount.native
      const ab_url = artBlocksData.external_url.replace(
        sale0.token.tokenId,
        sale.token.tokenId
      )
      const sellerText = await ensOrAddress(sale.from)

      const platform = sale.fillSource.toLowerCase()
      const platformUrl = this.getPlatformUrl(
        platform,
        sale.token.contract,
        sale.token.tokenId,
        ab_url
      )
      embed.addFields([
        {
          name: `${tokenName}`,
          value: `Price: ${price}\t${currency}
Seller: ${sellerText} ([${platform}](${platformUrl})) `,
        },
      ])
    }

    embed.setTitle(
      `${buyerText} bought ${
        sales.length
      } Friendship Bracelets for ${totalCost.toFixed(3)} ETH`
    )

    embed.setColor(this.sweepColor)

    console.log(buyerText + ' FB SWEEP')
    sendEmbedToSaleChannels(
      this.bot,
      embed,
      artBlocksData,
      CollectionType.EXPLORATIONS
    )
  }
}
