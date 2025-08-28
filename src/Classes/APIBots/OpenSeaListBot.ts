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
  isEngineContract,
  isExplorationsContract,
} from './utils'
import { ItemListedEvent } from '@opensea/stream-js'

const IDENTICAL_TOLERANCE = 0.0001
const LISTING_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

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

  constructor(bot: Client) {
    this.bot = bot

    // Setup cleanup interval for old listings
    setInterval(() => {
      this.cleanupOldListings()
    }, 60 * 60 * 1000) // Clean up every hour
  }

  /**
   * Cleanup listings older than TTL
   */
  private cleanupOldListings() {
    const now = Date.now()
    Object.entries(this.recentListings).forEach(([key, value]) => {
      if (now - value.timestamp > LISTING_TTL_MS) {
        delete this.recentListings[key]
      }
    })
  }

  /**
   * Main handler for OpenSea listing events
   * @param event - OpenSea stream event data
   */
  async handleListingEvent(event: ItemListedEvent) {
    try {
      await this.buildDiscordMessage(event.payload)
    } catch (err) {
      console.error('Error processing OpenSea listing event:', err)
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
   * Builds and sends Discord embed message for OpenSea listing
   * @param payload - OpenSea stream payload
   */
  async buildDiscordMessage(payload: ItemListedEvent['payload']) {
    const embed = new EmbedBuilder()

    // Parse the NFT ID to get contract and token info
    const nftInfo = this.parseNftId(payload.item.nft_id)
    if (!nftInfo) {
      console.warn('Could not parse NFT ID:', payload.item.nft_id)
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
      console.log(`Skipping identical OpenSea relisting for ${tokenId}`)
      return
    }
    this.recentListings[tokenId] = { price, timestamp: Date.now() }

    // Apply colors and platform styling
    embed.setColor(this.listColor as ColorResolvable) // Default to general listing color

    // Skip banned addresses
    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping OpenSea listing from banned address: ${owner}`)
      return
    }

    try {
      // Get Art Blocks metadata response for the item (same as ReservoirListBot)
      const tokenApiUrl = getTokenApiUrl(contractAddress, tokenId)
      const artBlocksResponse = await axios.get(tokenApiUrl)
      const artBlocksData = artBlocksResponse?.data
      const tokenUrl = getTokenUrl(
        artBlocksData.external_url,
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

      let curationStatus = artBlocksData?.curation_status
        ? artBlocksData.curation_status[0].toUpperCase() +
          artBlocksData.curation_status.slice(1).toLowerCase()
        : ''

      let title = `${artBlocksData.name} - ${artBlocksData.artist}`

      if (artBlocksData?.platform?.includes('Art Blocks x Pace')) {
        curationStatus = 'AB x Pace'
      } else if (artBlocksData?.platform === 'Art Blocks × Bright Moments') {
        curationStatus = 'AB x Bright Moments'
      } else if (isExplorationsContract(contractAddress)) {
        curationStatus = 'Explorations'
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
        console.log(artBlocksData.name + ' OpenSea LIST')
        sendEmbedToListChannels(
          this.bot,
          embed,
          artBlocksData,
          await getCollectionType(contractAddress)
        )
      }
    } catch (error) {
      console.error('Error building OpenSea listing message:', error)
    }
  }

  /**
   * Cleanup method to be called when the bot is being destroyed
   */
  cleanup() {
    this.recentListings = {}
  }
}
