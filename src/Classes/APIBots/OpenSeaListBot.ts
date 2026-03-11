import axios from 'axios'
import { Client, ColorResolvable, EmbedBuilder } from 'discord.js'
import {
  BAN_ADDRESSES,
  sendEmbedToListChannels,
} from '../../Utils/activityTriager'
import {
  LISTING_UTM,
  ensOrAddress,
  getCollectionType,
  getTokenApiUrl,
  getTokenUrl,
  replaceVideoWithGIF,
  parseNftId,
  getCurationStatus,
  buildEmbedTitle,
  cleanupTimestampCache,
  IDENTICAL_TOLERANCE,
  EVENT_DEDUP_TTL_MS,
  CLEANUP_INTERVAL_MS,
  ArtBlocksTokenData,
} from './utils'
import { ItemListedEvent } from '@opensea/stream-js'
import { logger } from '../../logger'

/**
 * Bot for handling OpenSea stream listing events
 * Similar to ReservoirListBot but for OpenSea stream data
 */
export class OpenSeaListBot {
  private bot: Client
  private recentListings: {
    [key: string]: { price: number; timestamp: number }
  } = {}
  private listColor = '#407FDB'
  private cleanupIntervalId?: NodeJS.Timeout

  constructor(bot: Client) {
    this.bot = bot

    // Setup cleanup interval for old listings
    this.cleanupIntervalId = setInterval(() => {
      this.cleanupOldListings()
    }, CLEANUP_INTERVAL_MS)
  }

  /**
   * Cleanup listings older than TTL
   */
  private cleanupOldListings() {
    cleanupTimestampCache(this.recentListings, EVENT_DEDUP_TTL_MS)
  }

  /**
   * Main handler for OpenSea listing events
   * @param event - OpenSea stream event data
   */
  async handleListingEvent(event: ItemListedEvent) {
    try {
      await this.buildDiscordMessage(event.payload)
    } catch (err) {
      logger.error({ err }, 'Error processing OpenSea listing event')
    }
  }

  /**
   * Builds and sends Discord embed message for OpenSea listing
   * @param payload - OpenSea stream payload
   */
  async buildDiscordMessage(payload: ItemListedEvent['payload']) {
    const embed = new EmbedBuilder()

    // Parse the NFT ID to get contract and token info
    const nftInfo = parseNftId(payload.item.nft_id)
    if (!nftInfo) {
      logger.warn({ nftId: payload.item.nft_id }, 'Could not parse NFT ID')
      return
    }

    const { contractAddress, tokenId } = nftInfo
    const priceText = 'List Price'
    const price = parseFloat(
      parseFloat(payload.payment_token.eth_price).toFixed(4)
    )
    const currency = payload.payment_token.symbol
    const owner = payload.maker.address
    const platform = 'OpenSea'

    // Check for duplicate listings (same token, similar price)
    if (
      this.recentListings[tokenId] &&
      Math.abs(this.recentListings[tokenId].price - price) <=
        IDENTICAL_TOLERANCE
    ) {
      logger.info({ tokenId }, 'Skipping identical OpenSea relisting')
      return
    }
    this.recentListings[tokenId] = { price, timestamp: Date.now() }

    // Apply colors and platform styling
    embed.setColor(this.listColor as ColorResolvable) // Default to general listing color

    // Skip banned addresses
    if (BAN_ADDRESSES.has(owner)) {
      logger.info({ owner }, 'Skipping OpenSea listing from banned address')
      return
    }

    try {
      // Get Art Blocks metadata response for the item (same as ReservoirListBot)
      const tokenApiUrl = getTokenApiUrl(nftInfo.chainId, contractAddress, tokenId)
      const artBlocksResponse = await axios.get(tokenApiUrl)
      const artBlocksData = artBlocksResponse?.data as ArtBlocksTokenData
      const tokenUrl = getTokenUrl(
        artBlocksData.external_url ?? '',
        nftInfo.chainId,
        contractAddress,
        tokenId
      )

      const sellerText = await ensOrAddress(owner)
      const baseABProfile = 'https://www.artblocks.io/user/'
      const sellerProfile = baseABProfile + owner + LISTING_UTM

      embed.addFields(
        {
          name: `Seller (${platform})`,
          value: `[${sellerText}](${sellerProfile})`,
        },
        {
          name: priceText,
          value: `${price} ${currency}`,
          inline: true,
        }
      )

      const curationStatus = getCurationStatus(artBlocksData, contractAddress)
      const title = buildEmbedTitle(artBlocksData, contractAddress)

      // Update thumbnail image to use larger variant from Art Blocks API.
      let assetUrl = artBlocksData?.preview_asset_url
      if (assetUrl && !assetUrl.includes('undefined')) {
        assetUrl = await replaceVideoWithGIF(assetUrl)
        embed.setThumbnail(assetUrl)
      }

      // Add fields
      const fields = []
      if (curationStatus && curationStatus.trim()) {
        fields.push({
          name: 'Collection',
          value: curationStatus,
          inline: true,
        })
      }

      fields.push({
        name: 'Live Script',
        value: `[view on artblocks.io](${tokenUrl + LISTING_UTM})`,
        inline: true,
      })

      embed.addFields(...fields)

      const platformUrl = payload.item.permalink

      embed.setTitle(title)
      if (platformUrl) {
        embed.setURL(platformUrl + LISTING_UTM)
      }
      if (artBlocksData.collection_name) {
        logger.info({ name: artBlocksData.name }, 'OpenSea LIST')
        sendEmbedToListChannels(
          this.bot,
          embed,
          artBlocksData,
          await getCollectionType(contractAddress)
        )
      }
    } catch (error) {
      logger.error({ err: error }, 'Error building OpenSea listing message')
    }
  }

  /**
   * Cleanup method to be called when the bot is being destroyed
   */
  cleanup() {
    if (this.cleanupIntervalId) {
      clearInterval(this.cleanupIntervalId)
      this.cleanupIntervalId = undefined
    }
    this.recentListings = {}
  }
}
