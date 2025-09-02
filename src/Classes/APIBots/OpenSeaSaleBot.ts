import axios from 'axios'
import { Client, EmbedBuilder } from 'discord.js'
import { formatEther } from 'viem'
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

export interface NormalizedOpenSeaSale {
  source: 'stream' | 'api'
  osAssetId: string
  contractAddress: string
  tokenId: string
  price: number
  currency: string
  usdPrice?: number
  seller: string
  buyer: string
  platformUrl?: string
}

/**
 * Bot for handling OpenSea sale events (Stream primary, API backfill)
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
   * Main handler for OpenSea sale events (Stream)
   * @param event - OpenSea stream event data
   */
  async handleSaleEvent(event: ItemSoldEvent) {
    try {
      const nftInfo = this.parseNftId(event.payload.item.nft_id)
      if (!nftInfo) {
        console.warn('Could not parse NFT ID:', event.payload.item.nft_id)
        return
      }

      const normalizedSale: NormalizedOpenSeaSale = {
        source: 'stream',
        osAssetId: event.payload.item.nft_id.toLowerCase(),
        contractAddress: nftInfo.contractAddress,
        tokenId: nftInfo.tokenId,
        price: parseFloat(
          parseFloat(formatEther(BigInt(event.payload.sale_price))).toFixed(4)
        ),
        currency: event.payload.payment_token.symbol,
        usdPrice: parseFloat(
          parseFloat(event.payload.payment_token.usd_price).toFixed(2)
        ),
        seller: event.payload.maker.address,
        buyer: event.payload.taker.address,
        platformUrl: undefined,
      }

      await this.handleNormalizedSale(normalizedSale)
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

    if (parts[0] !== 'ethereum') {
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
   * Unified handler for OpenSea sales from either Stream or API
   */
  async handleNormalizedSale(sale: NormalizedOpenSeaSale) {
    const embed = new EmbedBuilder()
    const { contractAddress, tokenId } = sale
    const priceText = 'Sale Price'
    const price = sale.price
    const usdPrice = sale.usdPrice ?? 0
    const currency = sale.currency
    const seller = sale.seller
    const buyer = sale.buyer
    let platform = 'OpenSea'

    // Check for duplicate sales using composite key (contract-token-seller-buyer)
    const compositeKey = buildCompositeSaleId(
      contractAddress,
      tokenId,
      seller,
      buyer
    )
    if (
      this.recentSales[compositeKey] &&
      Math.abs(this.recentSales[compositeKey].price - price) <=
        IDENTICAL_TOLERANCE
    ) {
      console.log(`Skipping identical OpenSea resale for ${compositeKey}`)
      return
    }
    this.recentSales[compositeKey] = { price, timestamp: Date.now() }

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
      const platformUrl = sale.platformUrl
        ? sale.platformUrl
        : this.getPlatformUrl(platform, contractAddress, tokenId, tokenUrl)

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
      if (
        this.twitterBot &&
        this.shouldTweetNormalizedSale(sale, artBlocksData)
      ) {
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
  private shouldTweetNormalizedSale(
    sale: NormalizedOpenSeaSale,
    artBlocksData: any
  ): boolean {
    const projectId = `${sale.contractAddress.toLowerCase()}-${
      artBlocksData.project_id
    }`
    const isAB500 = artIndexerBot.isAB500(projectId)

    if (!isAB500) {
      console.log('Skipping twitter sale for non-AB500 project', projectId)
      return false
    }

    if (sale.price < 0.1 && sale.currency.includes('ETH')) {
      console.log(
        'Skipping twitter sale for low-value OpenSea sale',
        sale.price,
        sale.currency
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

/**
 * Build a composite sale ID as contract-tokenId-seller-buyer
 */
export const buildCompositeSaleId = (
  contractAddress: string,
  tokenId: string,
  seller: string,
  buyer: string
): string => {
  return `${contractAddress.toLowerCase()}-${tokenId}-${(
    seller || ''
  ).toLowerCase()}-${(buyer || '').toLowerCase()}`
}
