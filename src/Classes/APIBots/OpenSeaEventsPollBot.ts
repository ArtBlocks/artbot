import { Client } from 'discord.js'
import axios from 'axios'

const POLL_INTERVAL_MS = 15 * 1000 // 15 seconds
const MAX_PAGES_PER_POLL = 3 // Limit pages to prevent runaway API calls
const EVENTS_PER_PAGE = 50 // Typical OpenSea page size

export interface OpenSeaEvent {
  event_type: 'sale' | 'listing' | 'offer' | 'transfer' | 'cancel_listing'
  chain: 'ethereum' | 'polygon' | 'arbitrum'
  order_hash?: string
  transaction?: {
    hash: string
    timestamp: string
  }
  nft?: {
    identifier: string
    collection: string
    contract: string
    token_standard: string
    name?: string
    description?: string
    image_url?: string
    metadata_url?: string
    opensea_url?: string
  }
  quantity: number
  seller?: {
    address: string
  }
  buyer?: {
    address: string
  }
  payment?: {
    quantity: string
    token_address?: string
    decimals?: number
    symbol?: string
  }
  closing_date?: string
  listing_date?: string
  expiration_date?: string
  event_timestamp: string
}

export interface OpenSeaEventsResponse {
  asset_events: OpenSeaEvent[]
  next?: string
}

/**
 * Base class for OpenSea Events API polling bots
 * Handles pagination and filtering for high-volume event streams
 */
export abstract class OpenSeaEventsPollBot {
  protected bot: Client
  protected headers: { [key: string]: string }
  protected lastUpdatedTime: number
  protected intervalId?: NodeJS.Timeout
  protected statsIntervalId?: NodeJS.Timeout
  protected trackedContracts: string[]
  protected eventType: 'sale' | 'listing'
  protected missedEventCount = 0
  protected totalPollCount = 0

  constructor(
    bot: Client,
    eventType: 'sale' | 'listing',
    trackedContracts: string[]
  ) {
    this.bot = bot
    this.eventType = eventType
    this.trackedContracts = trackedContracts.map((addr) => addr.toLowerCase())
    this.headers = {
      Accept: 'application/json',
      'x-api-key': process.env.OPENSEA_API_KEY ?? '',
    }

    // Start polling from current time to avoid processing old events
    this.lastUpdatedTime = Date.now()

    // Start polling
    this.startPolling()

    // Start periodic statistics logging
    this.startStatsLogging()
  }

  /**
   * Start polling the OpenSea Events API
   */
  protected startPolling() {
    this.intervalId = setInterval(() => {
      this.pollEvents().catch((err) => {
        console.error(`Error polling OpenSea ${this.eventType} events:`, err)
      })
    }, POLL_INTERVAL_MS)

    console.log(
      `Started OpenSea ${this.eventType} events polling (${POLL_INTERVAL_MS}ms interval)`
    )
  }

  /**
   * Start periodic statistics logging
   */
  protected startStatsLogging() {
    // Log stats every 10 minutes
    this.statsIntervalId = setInterval(() => {
      const missedRate =
        this.totalPollCount > 0
          ? ((this.missedEventCount / this.totalPollCount) * 100).toFixed(2)
          : '0.00'
      console.log(
        `📊 OpenSea ${this.eventType} polling stats: ${this.missedEventCount} missed events caught in ${this.totalPollCount} polls (${missedRate}% miss rate)`
      )
    }, 10 * 60 * 1000) // 10 minutes
  }

  /**
   * Stop polling
   */
  protected stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
    if (this.statsIntervalId) {
      clearInterval(this.statsIntervalId)
      this.statsIntervalId = undefined
    }
  }

  /**
   * Cleanup method
   */
  cleanup() {
    this.stopPolling()
  }

  /**
   * Poll events with smart pagination
   */
  protected async pollEvents() {
    try {
      this.totalPollCount++
      let cursor: string | undefined
      let foundRelevantEvents = 0
      let missedEventsThisPoll = 0
      let processedEvents = 0
      const startTime = Date.now()

      // Convert lastUpdatedTime to ISO string for API
      const occurredAfter = new Date(this.lastUpdatedTime).toISOString()

      for (let page = 0; page < MAX_PAGES_PER_POLL; page++) {
        const response = await this.fetchEventsPage(occurredAfter, cursor)

        if (!response.asset_events || response.asset_events.length === 0) {
          break
        }

        // Filter to relevant events immediately
        const relevantEvents = response.asset_events.filter((event) =>
          this.isRelevantEvent(event)
        )

        // Process relevant events and track missed ones
        for (const event of relevantEvents) {
          try {
            const wasNewEvent = await this.processEvent(event)
            foundRelevantEvents++
            if (wasNewEvent) {
              missedEventsThisPoll++
            }
          } catch (err) {
            console.error(`Error processing ${this.eventType} event:`, err)
          }
        }

        processedEvents += response.asset_events.length

        // Update cursor for next page
        cursor = response.next

        // Break early if:
        // 1. No more pages
        // 2. Page wasn't full (likely caught up)
        // 3. No relevant events found in this page (likely past our contracts)
        if (
          !cursor ||
          response.asset_events.length < EVENTS_PER_PAGE ||
          relevantEvents.length === 0
        ) {
          break
        }
      }

      // Update missed event count
      this.missedEventCount += missedEventsThisPoll

      // Update timestamp to latest event time + 1ms to avoid duplicates
      if (processedEvents > 0) {
        this.lastUpdatedTime = Date.now()
      }

      if (foundRelevantEvents > 0) {
        const missedText =
          missedEventsThisPoll > 0
            ? ` (${missedEventsThisPoll} missed by stream)`
            : ''
        console.log(
          `OpenSea ${
            this.eventType
          } poll: found ${foundRelevantEvents} relevant events in ${processedEvents} total events${missedText} (${
            Date.now() - startTime
          }ms)`
        )
      }
    } catch (err) {
      console.error(`Error in OpenSea ${this.eventType} polling:`, err)
    }
  }

  /**
   * Fetch a single page of events from OpenSea API
   */
  protected async fetchEventsPage(
    occurredAfter: string,
    cursor?: string
  ): Promise<OpenSeaEventsResponse> {
    const params = new URLSearchParams({
      event_type: this.eventType,
      chain: 'ethereum',
      occurred_after: occurredAfter,
      limit: EVENTS_PER_PAGE.toString(),
    })

    if (cursor) {
      params.append('next', cursor)
    }

    const url = `https://api.opensea.io/api/v2/events?${params.toString()}`

    const response = await axios.get(url, {
      headers: this.headers,
      timeout: 30000, // 30 second timeout
    })

    return response.data
  }

  /**
   * Check if an event is relevant to our tracked contracts
   */
  protected isRelevantEvent(event: OpenSeaEvent): boolean {
    // Must be ethereum chain
    if (event.chain !== 'ethereum') {
      return false
    }

    // Must have NFT info
    if (!event.nft?.contract) {
      return false
    }

    // Must be one of our tracked contracts
    const contractAddress = event.nft.contract.toLowerCase()
    return this.trackedContracts.includes(contractAddress)
  }

  /**
   * Process a single relevant event (to be implemented by subclasses)
   * @returns true if this was a new event missed by stream, false if already processed
   */
  protected abstract processEvent(event: OpenSeaEvent): Promise<boolean>

  /**
   * Parse NFT identifier into contract and token ID
   */
  protected parseNftIdentifier(
    identifier: string
  ): { contractAddress: string; tokenId: string } | null {
    const parts = identifier.split('/')
    if (parts.length !== 3 || parts[0] !== 'ethereum') {
      return null
    }

    return {
      contractAddress: parts[1],
      tokenId: parts[2],
    }
  }
}
