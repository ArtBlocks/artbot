import { Client } from 'discord.js'
import { APIPollBot } from './ApiPollBot'
import { TwitterBot } from '../TwitterBot'
import {
  OpenSeaSaleBot,
  buildCompositeSaleId,
  NormalizedOpenSeaSale,
} from './OpenSeaSaleBot'
// No utils needed here; SaleBot handles embed/tweet logic

// OpenSea Events API Types based on the provided payload examples
export interface OpenSeaEventResponse {
  next?: string
  previous?: string
  asset_events: OpenSeaEvent[]
}

export interface OpenSeaEvent {
  event_type: 'order' | 'sale' | 'transfer' | 'cancel' | 'redemption'
  order_hash?: string
  order_type?: any
  protocol_address?: string
  start_date?: number
  expiration_date?: number
  asset?: OpenSeaAsset
  nft?: OpenSeaAsset // Used in sale events
  quantity: number
  maker?: string
  taker?: string
  seller?: string // Used in sale events
  buyer?: string // Used in sale events
  payment: OpenSeaPayment
  criteria?: OpenSeaCriteria
  transaction?: string // Used in sale events
  chain?: string
  closing_date?: number // Used in sale events
  event_timestamp: number
  is_private_listing?: boolean
}

export interface OpenSeaAsset {
  identifier: string
  collection: string
  contract: string
  token_standard: string
  name: string
  description: string
  image_url: string
  display_image_url: string
  display_animation_url: string
  metadata_url: string
  opensea_url: string
  updated_at: string
  is_disabled: boolean
  is_nsfw: boolean
}

export interface OpenSeaPayment {
  quantity: string
  token_address: string
  decimals: number
  symbol: string
}

export interface OpenSeaCriteria {
  collection?: {
    slug: string
  }
  contract?: {
    address: string
  }
  trait?: {
    type: string
    value: string
  }
  encoded_token_ids?: string
}

const EVENT_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours
const MAX_PAGINATION_PAGES = 30 // Safety limit to prevent infinite pagination loops

/** Single API Poller for OpenSea Events API - handles SALES ONLY for backfilling missed stream events */
export class OpenSeaEventsPollBot extends APIPollBot {
  recentSales: { [key: string]: { price: number; timestamp: number } } = {}
  streamSaleIds: Set<string> = new Set() // Track sales processed by stream API
  twitterBot?: TwitterBot
  trackedContracts: string[] = []
  private saleBot: OpenSeaSaleBot

  /** Constructor extends APIPollBot
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   * @param {*} headers - Headers including API key
   * @param {TwitterBot} twitterBot - Optional TwitterBot instance for posting sale tweets
   * @param {string[]} trackedContracts - Array of contract addresses to filter for
   */
  constructor(
    apiEndpoint: string,
    refreshRateMs: number,
    bot: Client,
    headers: any,
    twitterBot: TwitterBot | undefined,
    trackedContracts: string[] = [],
    saleBot: OpenSeaSaleBot
  ) {
    // Set up initial API endpoint with parameters - fetch SALES ONLY for backfill
    const baseUrl = apiEndpoint
    const urlParams = new URLSearchParams()
    urlParams.append('after', Math.floor(Date.now() / 1000).toString())
    urlParams.append('limit', '50')
    urlParams.append('event_type', 'sale') // Sales only - listings handled by stream API
    const fullEndpoint = `${baseUrl}?${urlParams.toString()}`

    super(fullEndpoint, refreshRateMs, bot, headers)
    this.twitterBot = twitterBot
    this.trackedContracts = trackedContracts.map((addr) => addr.toLowerCase())
    this.lastUpdatedTime = Math.floor(Date.now() / 1000) // OpenSea uses Unix timestamps in seconds
    this.saleBot = saleBot
  }

  /**
   * Parses and handles OpenSea Events API endpoint data
   * Processes both sale and listing events from a single API call
   * Handles pagination to ensure we don't miss events when there are >50 events
   * @param {*} responseData - Dict parsed from API request json
   */
  async handleAPIResponse(responseData: OpenSeaEventResponse) {
    // console.log(responseData)
    await this.processEventPage(responseData, 'initial', 1)
  }

  /**
   * Processes a single page of events and handles pagination recursively
   * @param {OpenSeaEventResponse} responseData - Current page of events
   * @param {string} pageInfo - Info about current page for logging
   * @param {number} pageNumber - Current page number (for safety limits)
   */
  private async processEventPage(
    responseData: OpenSeaEventResponse,
    pageInfo = 'initial',
    pageNumber = 1
  ): Promise<void> {
    let maxTime = this.lastUpdatedTime
    let processedEventsCount = 0
    let totalEventsInPage = 0
    let eventsNewerThanTimestamp = 0

    if (!responseData.asset_events || responseData.asset_events.length === 0) {
      console.log(`OpenSea API: No events in ${pageInfo} page`)
      return
    }

    totalEventsInPage = responseData.asset_events.length

    for (const event of responseData.asset_events) {
      const eventTime = event.event_timestamp

      // Count events newer than our timestamp for debugging
      if (eventTime > this.lastUpdatedTime) {
        eventsNewerThanTimestamp++
      }

      if (event.chain !== 'ethereum') {
        continue
      }

      // Update max time for ALL newer events (not just processed ones)
      if (eventTime > maxTime) {
        maxTime = eventTime
      }

      // Only process events that are newer than our last update time
      if (eventTime <= this.lastUpdatedTime) {
        continue
      }

      // Filter for sales only (listings handled by stream API)
      if (event.event_type !== 'sale') {
        continue
      }

      // Filter by tracked contracts first
      const asset = event.event_type === 'sale' ? event.nft : event.asset
      if (!asset) {
        console.warn(`${event.event_type} event missing asset data:`, event)
        continue
      }

      const contractAddress = asset.contract.toLowerCase()
      if (!this.trackedContracts.includes(contractAddress)) {
        continue
      }

      // Check if this sale was already processed by the stream API
      const compositeId = buildCompositeSaleId(
        contractAddress,
        asset.identifier,
        event.seller || '',
        event.buyer || ''
      )
      const saleId = event.transaction || compositeId
      if (this.streamSaleIds.has(saleId)) {
        // Sale already processed by stream - skip
        console.log(`Skipping ${saleId} event`)
        continue
      }

      // This is a missed sale! Log it and process
      console.log(
        `🚨 OpenSea API: Found MISSED SALE - ${asset.name} (#${asset.identifier}) from contract ${contractAddress}`
      )

      try {
        await this.handleSaleEvent(event)
        processedEventsCount++
      } catch (err) {
        console.error(`Error sending OpenSea API sale message`, err)
      }
    }

    // Log summary for important events or debugging

    console.log(
      `OpenSea API: Page ${pageNumber} - Processed: ${processedEventsCount} events, Total: ${totalEventsInPage}`
    )

    // Handle pagination - continue until we've processed all available sales
    if (responseData.next) {
      if (pageNumber >= MAX_PAGINATION_PAGES) {
        console.warn(
          `OpenSea API: Reached maximum pagination limit (${MAX_PAGINATION_PAGES} pages), stopping pagination`
        )
      } else if (eventsNewerThanTimestamp === 0 && pageNumber > 1) {
        // Stop pagination when we reach events older than our timestamp
        return
      } else {
        try {
          const nextPageResponse = await this.fetchNextPage(responseData.next)
          await this.processEventPage(
            nextPageResponse,
            `paginated-${pageNumber + 1}`,
            pageNumber + 1
          )
        } catch (err) {
          console.error('Error fetching paginated events:', err)
        }
      }
    }

    // Update our timestamp immediately if we found newer events
    if (maxTime > this.lastUpdatedTime) {
      this.lastUpdatedTime = maxTime
      this.updateApiEndpointTimestamp()
    }

    // Cleanup old events periodically
    if (pageNumber === 1) {
      this.cleanupOldEvents()
    }
  }

  /**
   * Fetches the next page of events using the cursor
   * @param {string} nextCursor - The cursor for the next page
   * @returns {Promise<OpenSeaEventResponse>} Next page of events
   */
  private async fetchNextPage(
    nextCursor: string
  ): Promise<OpenSeaEventResponse> {
    try {
      const baseUrl = this.apiEndpoint.split('?')[0]
      const urlParams = new URLSearchParams()

      urlParams.append('next', nextCursor)
      urlParams.append('limit', '50')
      urlParams.append('event_type', 'sale') // CRITICAL: Preserve the sales-only filter!

      const paginatedUrl = `${baseUrl}?${urlParams.toString()}`

      const response = await this.getWithRetry(
        paginatedUrl,
        { headers: this.headers, timeout: 15000 },
        3
      )

      return response.data
    } catch (error) {
      console.error('Error fetching next page of OpenSea events:', error)
      throw error
    }
  }

  /**
   * Updates the API endpoint URL with the latest timestamp
   */
  private updateApiEndpointTimestamp() {
    const baseUrl = this.apiEndpoint.split('?')[0]
    const urlParams = new URLSearchParams()

    // Sales only for backfill
    urlParams.append('after', this.lastUpdatedTime.toString())
    urlParams.append('limit', '50') // Reasonable batch size
    urlParams.append('event_type', 'sale') // Sales only - listings handled by stream API

    this.apiEndpoint = `${baseUrl}?${urlParams.toString()}`
  }

  /**
   * Cleanup old events and stream sale IDs
   */
  private cleanupOldEvents() {
    const now = Date.now()

    // Cleanup old sales
    Object.entries(this.recentSales).forEach(([key, value]) => {
      if (now - value.timestamp > EVENT_TTL_MS) {
        delete this.recentSales[key]
      }
    })

    // Cleanup old stream sale IDs to prevent memory bloat
    if (this.streamSaleIds.size > 10000) {
      this.streamSaleIds.clear()
    }
  }

  /**
   * Handles sale events specifically
   * @param {OpenSeaEvent} saleEvent - Sale event data from OpenSea API response
   */
  async handleSaleEvent(saleEvent: OpenSeaEvent) {
    if (!saleEvent.nft) {
      console.warn('Sale event missing nft data')
      return
    }

    const asset = saleEvent.nft
    const tokenId = asset.identifier
    const contractAddress = asset.contract.toLowerCase()

    const price =
      parseFloat(saleEvent.payment.quantity) /
      Math.pow(10, saleEvent.payment.decimals)
    const currency = saleEvent.payment.symbol
    const seller = saleEvent.seller || ''
    const buyer = saleEvent.buyer || ''

    const normalized: NormalizedOpenSeaSale = {
      source: 'api',
      osAssetId: `ethereum/${contractAddress}/${tokenId}`,
      contractAddress,
      tokenId,
      price,
      currency,
      usdPrice: undefined,
      seller,
      buyer,
      platformUrl: asset.opensea_url,
    }

    // Leave duplicate suppression to the sale bot
    await this.saleBot.handleNormalizedSale(normalized)
  }

  /**
   * Determines whether a sale should be posted to Twitter
   */
  // Twitter decision is handled in the sale bot

  /**
   * Updates the tracked contracts list
   */
  updateTrackedContracts(contracts: string[]) {
    this.trackedContracts = contracts.map((addr) => addr.toLowerCase())
  }

  /**
   * Register a sale processed by the stream API to avoid duplicate processing
   * Call this from the stream API sale handler
   * @param {string} transactionHash - Transaction hash of the sale
   * @param {string} contractAddress - Contract address
   * @param {string} tokenId - Token ID
   * @param {number} timestamp - Sale timestamp
   */
  registerStreamSale(
    transactionHash: string,
    contractAddress?: string,
    tokenId?: string,
    seller?: string,
    buyer?: string
  ) {
    // Primary ID is transaction hash if available
    if (transactionHash) {
      this.streamSaleIds.add(transactionHash)
    }

    // Backup ID in case transaction hash differs
    if (contractAddress && tokenId && seller && buyer) {
      const backupId = buildCompositeSaleId(
        contractAddress,
        tokenId,
        seller,
        buyer
      )
      this.streamSaleIds.add(backupId)
    }
  }

  /**
   * Get stats about stream vs API sale detection
   */
  getStats() {
    return {
      streamSalesTracked: this.streamSaleIds.size,
      recentSalesTracked: Object.keys(this.recentSales).length,
    }
  }

  /**
   * Cleanup method to be called when the bot is being destroyed
   */
  cleanup() {
    super.cleanup()
    this.recentSales = {}
    this.streamSaleIds.clear()
  }
}
