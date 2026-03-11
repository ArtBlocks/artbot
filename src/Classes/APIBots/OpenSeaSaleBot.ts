import axios from 'axios'
import { Client, EmbedBuilder } from 'discord.js'
import { formatEther } from 'viem'
import {
  BAN_ADDRESSES,
  sendEmbedToSaleChannels,
} from '../../Utils/activityTriager'
import {
  getTokenApiUrl,
  getCollectionType,
  SALE_UTM,
  ensOrAddress,
  replaceVideoWithGIF,
  getTokenUrl,
  getOSName,
  buildArtBlocksTokenURL,
  parseNftId,
  getCurationStatus,
  buildEmbedTitle,
  cleanupTimestampCache,
  IDENTICAL_TOLERANCE,
  EVENT_DEDUP_TTL_MS,
  CLEANUP_INTERVAL_MS,
  ArtBlocksTokenData,
} from './utils'
import { ItemSoldEvent } from '@opensea/stream-js'
import { TwitterBot } from '../TwitterBot'
import { artIndexerBot } from '../..'
import { logger } from '../../logger'

export interface NormalizedOpenSeaSale {
  source: 'stream' | 'api'
  chainId: number
  osAssetId: string
  contractAddress: string
  tokenId: string
  price: number
  currency: string
  usdPrice?: number
  seller: string
  buyer: string
  platformUrl?: string
  timestamp: string
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
  private cleanupIntervalId?: NodeJS.Timeout

  constructor(bot: Client, twitterBot?: TwitterBot) {
    this.bot = bot
    this.twitterBot = twitterBot

    // Setup cleanup interval for old sales
    this.cleanupIntervalId = setInterval(() => {
      this.cleanupOldSales()
    }, CLEANUP_INTERVAL_MS)
  }

  /**
   * Cleanup sales older than TTL
   */
  private cleanupOldSales() {
    cleanupTimestampCache(this.recentSales, EVENT_DEDUP_TTL_MS)
  }

  /**
   * Main handler for OpenSea sale events (Stream)
   * @param event - OpenSea stream event data
   */
  async handleSaleEvent(event: ItemSoldEvent) {
    try {
      const nftInfo = parseNftId(event.payload.item.nft_id)
      if (!nftInfo) {
        logger.warn({ nftId: event.payload.item.nft_id }, 'Could not parse NFT ID')
        return
      }

      logger.info(
        {
          name: event.payload.item.metadata.name,
          timestamp: new Date(event.payload.event_timestamp).toISOString(),
          sentAt: event.sent_at,
        },
        'New stream sale event'
      )

      const ethPrice = parseFloat(
        parseFloat(formatEther(BigInt(event.payload.sale_price))).toFixed(4)
      )
      const normalizedSale: NormalizedOpenSeaSale = {
        source: 'stream',
        chainId: nftInfo.chainId,
        osAssetId: event.payload.item.nft_id.toLowerCase(),
        contractAddress: nftInfo.contractAddress,
        tokenId: nftInfo.tokenId,
        price: ethPrice,
        currency: event.payload.payment_token.symbol,
        usdPrice: parseFloat(
          (
            parseFloat(event.payload.payment_token.usd_price) * ethPrice
          ).toFixed(2)
        ),
        seller: event.payload.maker.address,
        buyer: event.payload.taker.address,
        platformUrl: undefined,
        timestamp: event.payload.event_timestamp,
      }

      await this.handleNormalizedSale(normalizedSale)
    } catch (err) {
      logger.error({ err }, 'Error processing OpenSea sale event')
    }
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

    const timestamp = new Date(sale.timestamp).getTime()
    const now = Date.now()
    const timeDiff = now - timestamp
    if (timeDiff > 1000 * 60 * 60 * 4) {
      logger.info({ timestamp }, 'Skipping OpenSea sale from more than 4 hours ago')
      return
    }

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
      logger.info({ compositeKey }, 'Skipping identical OpenSea resale')
      return
    }
    this.recentSales[compositeKey] = { price, timestamp: Date.now() }

    embed.setColor(this.saleColor)
    platform = 'OpenSea'

    // Skip banned addresses
    if (BAN_ADDRESSES.has(seller)) {
      logger.info({ seller }, 'Skipping OpenSea sale from banned address')
      return
    }

    try {
      // Get Art Blocks metadata response for the item (same as ReservoirSaleBot)
      const tokenApiUrl = getTokenApiUrl(sale.chainId, contractAddress, tokenId)
      const artBlocksResponse = await axios.get(tokenApiUrl)
      const artBlocksData = artBlocksResponse?.data as ArtBlocksTokenData

      const tokenUrl = getTokenUrl(
        artBlocksData.external_url ?? '',
        sale.chainId,
        contractAddress,
        tokenId
      )

      let sellerText = await ensOrAddress(seller)
      let buyerText = await ensOrAddress(buyer)
      const platformUrl = buildArtBlocksTokenURL(sale.chainId, contractAddress, tokenId)

      // Add OpenSea usernames if available (same logic as ReservoirSaleBot)
      if (!sellerText.includes('.eth')) {
        const sellerOS = await getOSName(seller)
        sellerText =
          sellerOS === '' ? sellerText : `${sellerText} (OS: ${sellerOS})`
      }
      if (!buyerText.includes('.eth')) {
        const buyerOS = await getOSName(buyer)
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

      const title = buildEmbedTitle(artBlocksData, contractAddress)
      const curationStatus = getCurationStatus(artBlocksData, contractAddress)

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
        logger.info({ name: artBlocksData.name }, 'OpenSea SALE')
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
            projectName: artBlocksData.collection_name ?? '',
            artist: artBlocksData.artist,
            salePrice: price,
            usdPrice: usdPrice,
            currency: currency,
            buyer: buyer,
            seller: seller,
            assetUrl: assetUrl || artBlocksData.preview_asset_url || '',
            tokenUrl: tokenUrl,
            platform: platform,
          })
        } catch (error) {
          logger.error({ err: error }, 'Error posting OpenSea sale to Twitter')
        }
      }
    } catch (error) {
      logger.error({ err: error }, 'Error building OpenSea sale message')
    }
  }

  /**
   * Determines whether a sale should be posted to Twitter
   * Similar logic to ReservoirSaleBot but adapted for OpenSea events
   */
  private shouldTweetNormalizedSale(
    sale: NormalizedOpenSeaSale,
    artBlocksData: ArtBlocksTokenData
  ): boolean {
    const projectId = `${sale.contractAddress.toLowerCase()}-${
      artBlocksData.project_id
    }`
    const isAB500 = artIndexerBot.isAB500(projectId)

    if (!isAB500) {
      logger.info({ projectId }, 'Skipping twitter sale for non-AB500 project')
      return false
    }

    if (sale.price < 0.1 && sale.currency.includes('ETH')) {
      logger.info({ price: sale.price, currency: sale.currency }, 'Skipping twitter sale for low-value OpenSea sale')
      return false
    }

    return true
  }

  /**
   * Cleanup method to be called when the bot is being destroyed
   */
  cleanup() {
    if (this.cleanupIntervalId) {
      clearInterval(this.cleanupIntervalId)
      this.cleanupIntervalId = undefined
    }
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
