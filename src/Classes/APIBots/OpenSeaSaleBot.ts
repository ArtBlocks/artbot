import axios from 'axios'
import { Client, EmbedBuilder } from 'discord.js'
import {
  BAN_ADDRESSES,
  sendEmbedToSaleChannels,
} from '../../Utils/activityTriager'
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
  getOSName,
} from './utils'
import { ItemSoldEvent } from '@opensea/stream-js'
import { TwitterBot } from '../TwitterBot'
import { artIndexerBot } from '../..'

const IDENTICAL_TOLERANCE = 0.0001
const SALE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Bot for handling OpenSea stream sale events
 * Similar to ReservoirSaleBot but for OpenSea stream data
 */
export class OpenSeaSaleBot {
  private bot: Client
  private twitterBot?: TwitterBot
  private recentSales: { [key: string]: { price: number; timestamp: number } } =
    {}
  private saleColor = 0x27ae60 // Green color for OpenSea sales (different from Reservoir)

  constructor(bot: Client, twitterBot?: TwitterBot) {
    this.bot = bot
    this.twitterBot = twitterBot

    // Setup cleanup interval for old sales
    setInterval(() => {
      this.cleanupOldSales()
    }, 60 * 60 * 1000) // Clean up every hour
  }

  /**
   * Cleanup sales older than TTL
   */
  private cleanupOldSales() {
    const now = Date.now()
    Object.entries(this.recentSales).forEach(([key, value]) => {
      if (now - value.timestamp > SALE_TTL_MS) {
        delete this.recentSales[key]
      }
    })
  }

  /**
   * Main handler for OpenSea sale events
   * @param event - OpenSea stream event data
   */
  async handleSaleEvent(event: ItemSoldEvent) {
    try {
      await this.buildDiscordMessage(event.payload)
    } catch (err) {
      console.error('Error processing OpenSea sale event:', err)
    }
  }

  /**
   * Parses OpenSea NFT ID and extracts contract address and token ID
   * @param nftId - Format: "ethereum/0x2308742aa28cc460522ff855d24a365f99deba7b/7111"
   * @returns {contractAddress, tokenId} or null if invalid format
   */
  private parseNftId(
    nftId: string
  ): { contractAddress: string; tokenId: string } | null {
    const parts = nftId.split('/')
    if (parts.length !== 3) {
      console.warn('Invalid NFT ID format:', nftId)
      return null
    }

    return {
      contractAddress: parts[1].toLowerCase(),
      tokenId: parts[2],
    }
  }

  /**
   * Get OpenSea name for an address (similar to ReservoirSaleBot)
   */
  private async osName(address: string): Promise<string> {
    return await getOSName(address)
  }

  /**
   * Get platform URL for the sale (similar to ReservoirSaleBot.getPlatformUrl)
   */
  private getPlatformUrl(
    platform: string,
    contractAddress: string,
    tokenId: string,
    tokenUrl: string
  ): string {
    // For OpenSea, we can use the permalink from the payload
    // This method is here for consistency with ReservoirSaleBot structure
    return tokenUrl
  }

  /**
   * Builds and sends Discord embed message for OpenSea sale
   * @param payload - OpenSea stream payload
   */
  async buildDiscordMessage(payload: ItemSoldEvent['payload']) {
    const embed = new EmbedBuilder()

    // Parse the NFT ID to get contract and token info
    const nftInfo = this.parseNftId(payload.item.nft_id)
    if (!nftInfo) {
      console.warn('Could not parse NFT ID:', payload.item.nft_id)
      return
    }

    const { contractAddress, tokenId } = nftInfo
    const priceText = 'Sale Price'
    const price = parseFloat(
      parseFloat(payload.payment_token.eth_price).toFixed(4)
    )
    const usdPrice = parseFloat(
      parseFloat(payload.payment_token.usd_price).toFixed(2)
    )
    const currency = payload.payment_token.symbol
    const seller = payload.maker.address
    const buyer = payload.taker.address
    let platform = 'OpenSea'

    // Check for duplicate sales (same token, similar price)
    if (
      this.recentSales[tokenId] &&
      Math.abs(this.recentSales[tokenId].price - price) <= IDENTICAL_TOLERANCE
    ) {
      console.log(`Skipping identical OpenSea resale for ${tokenId}`)
      return
    }
    this.recentSales[tokenId] = { price, timestamp: Date.now() }

    embed.setColor(this.saleColor)
    platform = 'OpenSea'

    // Skip banned addresses
    if (BAN_ADDRESSES.has(seller)) {
      console.log(`Skipping OpenSea sale from banned address: ${seller}`)
      return
    }

    try {
      // Get Art Blocks metadata response for the item (same as ReservoirSaleBot)
      const tokenApiUrl = getTokenApiUrl(contractAddress, tokenId)
      const artBlocksResponse = await axios.get(tokenApiUrl)
      const artBlocksData = artBlocksResponse?.data

      const tokenUrl = getTokenUrl(
        artBlocksData.external_url,
        contractAddress,
        tokenId
      )

      let sellerText = await ensOrAddress(seller)
      let buyerText = await ensOrAddress(buyer)
      const platformUrl = this.getPlatformUrl(
        platform,
        contractAddress,
        tokenId,
        tokenUrl
      )

      // Add OpenSea usernames if available (same logic as ReservoirSaleBot)
      if (!sellerText.includes('.eth')) {
        const sellerOS = await this.osName(seller)
        sellerText =
          sellerOS === '' ? sellerText : `${sellerText} (OS: ${sellerOS})`
      }
      if (!buyerText.includes('.eth')) {
        const buyerOS = await this.osName(buyer)
        buyerText = buyerOS === '' ? buyerText : `${buyerText} (OS: ${buyerOS})`
      }

      const baseABProfile = 'https://www.artblocks.io/user/'
      const sellerProfile = baseABProfile + seller + SALE_UTM
      const buyerProfile = baseABProfile + buyer + SALE_UTM

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

      if (artBlocksData?.platform?.includes('Art Blocks x Pace')) {
        curationStatus = 'AB x Pace'
      } else if (artBlocksData?.platform === 'Art Blocks × Bright Moments') {
        curationStatus = 'AB x Bright Moments'
      } else if (isExplorationsContract(contractAddress)) {
        curationStatus = 'Explorations'
      } else if (isStudioContract(contractAddress)) {
        curationStatus = 'Studio'
      } else if (isEngineContract(contractAddress)) {
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

      // Only add Collection field if curationStatus has a value
      const fields = []
      if (curationStatus && curationStatus.trim()) {
        fields.push({
          name: `Collection`,
          value: `${curationStatus}`,
          inline: true,
        })
      }
      fields.push({
        name: 'Live Script',
        value: `[view on artblocks.io](${tokenUrl + SALE_UTM})`,
        inline: true,
      })

      embed.addFields(...fields)
      embed.setTitle(title)
      if (platformUrl) {
        embed.setURL(platformUrl + SALE_UTM)
      }

      if (artBlocksData.collection_name) {
        console.log(artBlocksData.name + ' OpenSea SALE')
        sendEmbedToSaleChannels(
          this.bot,
          embed,
          artBlocksData,
          await getCollectionType(contractAddress)
        )
      }

      // Post to Twitter if TwitterBot is available and sale meets criteria
      if (this.twitterBot && this.shouldTweetSale(payload, artBlocksData)) {
        try {
          await this.twitterBot.tweetSale({
            tokenName: artBlocksData.name,
            projectName: artBlocksData.collection_name,
            artist: artBlocksData.artist,
            salePrice: price,
            usdPrice: usdPrice,
            currency: currency,
            buyer: buyer,
            seller: seller,
            assetUrl: assetUrl || artBlocksData.preview_asset_url,
            tokenUrl: tokenUrl,
            platform: platform,
          })
        } catch (error) {
          console.error('Error posting OpenSea sale to Twitter:', error)
        }
      }
    } catch (error) {
      console.error('Error building OpenSea sale message:', error)
    }
  }

  /**
   * Determines whether a sale should be posted to Twitter
   * Similar logic to ReservoirSaleBot but adapted for OpenSea events
   */
  private shouldTweetSale(
    payload: ItemSoldEvent['payload'],
    artBlocksData: any
  ): boolean {
    const nftInfo = this.parseNftId(payload.item.nft_id)
    if (!nftInfo) return false

    const projectId = `${nftInfo.contractAddress.toLowerCase()}-${
      artBlocksData.project_id
    }`
    const isAB500 = artIndexerBot.isAB500(projectId)

    if (!isAB500) {
      console.log('Skipping twitter sale for non-AB500 project', projectId)
      return false
    }

    const price = parseFloat(payload.payment_token.eth_price)
    if (price < 0.1 && payload.payment_token.symbol.includes('ETH')) {
      console.log(
        'Skipping twitter sale for low-value OpenSea sale',
        price,
        payload.payment_token.symbol
      )
      return false
    }

    return true
  }

  /**
   * Cleanup method to be called when the bot is being destroyed
   */
  cleanup() {
    this.recentSales = {}
  }
}
