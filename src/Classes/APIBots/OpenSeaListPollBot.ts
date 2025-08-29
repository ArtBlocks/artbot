import { Client } from 'discord.js'
import { OpenSeaEventsPollBot, OpenSeaEvent } from './OpenSeaEventsPollBot'
import { OpenSeaListBot } from './OpenSeaListBot'

/**
 * Polling bot for OpenSea listing events
 * Works alongside the stream to catch missed events
 */
export class OpenSeaListPollBot extends OpenSeaEventsPollBot {
  private listBot: OpenSeaListBot

  constructor(bot: Client, trackedContracts: string[]) {
    super(bot, 'listing', trackedContracts)

    // Create a list bot instance to reuse existing message building logic
    this.listBot = new OpenSeaListBot(bot)
  }

  /**
   * Process a listing event by converting it to stream format and delegating
   * @returns true if this was a new event missed by stream, false if already processed
   */
  protected async processEvent(event: OpenSeaEvent): Promise<boolean> {
    // Convert OpenSea Events API format to Stream API format
    const streamEvent = this.convertToStreamFormat(event)

    if (streamEvent) {
      // Delegate to existing OpenSeaListBot logic with 'poll' source and use return value
      const missedByStream = await this.listBot.handleListingEvent(
        streamEvent,
        'poll'
      )
      return missedByStream
    }

    return false
  }

  // No separate event ID or processed checks needed; handled inside list bot

  /**
   * Convert Events API event to Stream API format
   */
  private convertToStreamFormat(event: OpenSeaEvent): any | null {
    if (!event.nft?.identifier || !event.payment) {
      return null
    }

    const nftInfo = this.parseNftIdentifier(event.nft.identifier)
    if (!nftInfo) {
      return null
    }

    // For listings, we need to estimate ETH price from payment quantity
    // The Events API provides the raw payment amount
    const ethPrice = this.estimateEthPrice(
      event.payment.quantity,
      event.payment.decimals || 18
    )

    // Convert to stream event format that OpenSeaListBot expects
    return {
      payload: {
        item: {
          nft_id: event.nft.identifier,
        },
        payment_token: {
          symbol: event.payment.symbol || 'ETH',
          decimals: event.payment.decimals || 18,
          eth_price: ethPrice.toString(),
        },
        maker: {
          address: event.seller?.address || '',
        },
        listing_date: event.event_timestamp,
      },
    }
  }

  /**
   * Estimate ETH price from payment quantity and decimals
   */
  private estimateEthPrice(quantity: string, decimals: number): number {
    try {
      // Convert from wei-like units to ETH-like units
      const price = parseInt(quantity) / Math.pow(10, decimals)
      return price
    } catch (err) {
      console.warn('Failed to parse payment quantity:', quantity)
      return 0
    }
  }

  /**
   * Override cleanup to also cleanup the list bot
   */
  cleanup() {
    super.cleanup()
    this.listBot.cleanup()
  }
}
