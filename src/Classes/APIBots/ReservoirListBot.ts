import axios from 'axios'
import { Client, EmbedBuilder } from 'discord.js'
import {
  BAN_ADDRESSES,
  sendEmbedToListChannels,
} from '../../Utils/activityTriager'
import { APIPollBot } from './ApiPollBot'

import {
  LISTING_UTM,
  ensOrAddress,
  getCollectionType,
  getTokenApiUrl,
  isEngineContract,
  isExplorationsContract,
  replaceVideoWithGIF,
} from './utils'

type ReservoirListing = {
  maker: string
  tokenSetId: string
  contract: string
  price: {
    currency: {
      symbol: string
    }
    amount: {
      decimal: number
    }
  }
  source: {
    name: string
    domain: string
    url: string
  }
  createdAt: string
}

type ReservoirListResponse = {
  orders: ReservoirListing[]
}

/** API Poller for Reservoir Sale events */
export class ReservoirListBot extends APIPollBot {
  /** Constructor just calls super
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   */
  constructor(
    apiEndpoint: string,
    refreshRateMs: number,
    bot: Client,
    headers: any
  ) {
    super(apiEndpoint, refreshRateMs, bot, headers)
    this.lastUpdatedTime = Math.floor(this.lastUpdatedTime)
  }

  /**
   * Parses and handles Reservoir API endpoint data
   * Only sends events that are new
   * Response spec: https://docs.reservoir.tools/reference/getordersasksv2
   * @param {*} responseData - Dict parsed from API request json
   */
  async handleAPIResponse(responseData: ReservoirListResponse) {
    let maxTime = 0
    for (const data of responseData.orders) {
      const eventTime = Date.parse(data.createdAt)
      // Only deal with event if it is new
      if (this.lastUpdatedTime < eventTime) {
        this.buildDiscordMessage(data).catch((err) => {
          console.error('Error sending listing message', err)
        })
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
   * Reservoir API Spec: https://docs.reservoir.tools/reference/getordersasksv2
   * @param {*} listing - Dict of event data from API response
   */
  async buildDiscordMessage(listing: ReservoirListing) {
    // Create embed we will be sending
    const embed = new EmbedBuilder()

    // Parsing message to get info
    const tokenID = listing.tokenSetId.split(':')[2]
    const priceText = 'List Price'
    const price = listing.price.amount.decimal
    const currency = listing.price.currency.symbol
    const owner = listing.maker
    let platform = listing.source.name
    if (listing.source.domain.includes('artblocks')) {
      embed.setColor(this.artblocksListColor)
      platform = 'Art Blocks <:lilsquig:1028047420636020786>'
    } else {
      embed.setColor(this.listColor)
    }

    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping message propagation for ${owner}`)
      return
    }

    if (listing.source.name.toLowerCase().includes('looksrare')) {
      console.log(`Skipping message propagation for LooksRare`)
      return
    }

    const sellerText = await ensOrAddress(listing.maker)
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

    // Get Art Blocks metadata response for the item.
    const tokenUrl = getTokenApiUrl(listing.contract, tokenID)
    const artBlocksResponse = await axios.get(tokenUrl)
    const artBlocksData = artBlocksResponse?.data

    let curationStatus = artBlocksData?.curation_status
      ? artBlocksData.curation_status[0].toUpperCase() +
        artBlocksData.curation_status.slice(1).toLowerCase()
      : ''

    let title = `${artBlocksData.name} - ${artBlocksData.artist}`

    if (artBlocksData?.platform.includes('Art Blocks x Pace')) {
      curationStatus = 'AB x Pace'
    } else if (artBlocksData?.platform === 'Art Blocks × Bright Moments') {
      curationStatus = 'AB x Bright Moments'
    } else if (isExplorationsContract(listing.contract)) {
      curationStatus = 'Explorations'
    } else if (await isEngineContract(listing.contract)) {
      curationStatus = 'Engine'
      if (artBlocksData?.platform) {
        title = `${artBlocksData.platform} - ${title}`
      }
    }
    // Update thumbnail image to use larger variant from Art Blocks API.
    if (artBlocksData?.image && !artBlocksData.image.includes('undefined')) {
      artBlocksData.image = await replaceVideoWithGIF(artBlocksData.image)
      embed.setThumbnail(artBlocksData.image)
    }

    embed.addFields(
      {
        name: `Collection`,
        value: `${curationStatus}`,
        inline: true,
      },
      {
        name: 'Live Script',
        value: `[view on artblocks.io](${
          (artBlocksData.external_url || artBlocksData.generator_url) +
          LISTING_UTM
        })`,
        inline: true,
      }
    )

    const platformUrl = listing.source.url

    embed.setTitle(title)
    if (platformUrl) {
      embed.setURL(platformUrl)
    }
    if (artBlocksData.collection_name) {
      console.log(artBlocksData.name + ' LIST')
      sendEmbedToListChannels(
        this.bot,
        embed,
        artBlocksData,
        await getCollectionType(listing.contract)
      )
    }
  }
}
