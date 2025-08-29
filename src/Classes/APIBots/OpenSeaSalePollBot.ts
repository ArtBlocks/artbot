import { Client } from 'discord.js'
import { OpenSeaEventsPollBot, OpenSeaEvent } from './OpenSeaEventsPollBot'
import { OpenSeaSaleBot } from './OpenSeaSaleBot'
import { TwitterBot } from '../TwitterBot'

/**
 * Polling bot for OpenSea sale events
 * Works alongside the stream to catch missed events
 */
export class OpenSeaSalePollBot extends OpenSeaEventsPollBot {
  private saleBot: OpenSeaSaleBot

  constructor(
    bot: Client,
    trackedContracts: string[],
    twitterBot?: TwitterBot
  ) {
    super(bot, 'sale', trackedContracts)

    // Create a sale bot instance to reuse existing message building logic
    this.saleBot = new OpenSeaSaleBot(bot, twitterBot)
  }

  /**
   * Process a sale event by converting it to stream format and delegating
   * @returns true if this was a new event missed by stream, false if already processed
   */
  protected async processEvent(event: OpenSeaEvent): Promise<boolean> {
    // Convert OpenSea Events API format to Stream API format
    const streamEvent = this.convertToStreamFormat(event)

    if (streamEvent) {
      // Delegate to existing OpenSeaSaleBot logic with 'poll' source and use return value
      const missedByStream = await this.saleBot.handleSaleEvent(
        streamEvent,
        'poll'
      )
      return missedByStream
    }

    return false
  }

  // No separate event ID or processed checks needed; handled inside sale bot

  /**
   * Convert Events API event to Stream API format
   */
  private convertToStreamFormat(event: OpenSeaEvent): any | null {
    if (!event.nft?.identifier || !event.nft.contract || !event.payment) {
      return null
    }

    // Build stream nft_id from Events API fields: "chain/contract/tokenId"
    const nftId = `${event.chain}/${event.nft.contract}/${event.nft.identifier}`

    // Convert to stream event format that OpenSeaSaleBot expects
    return {
      payload: {
        item: {
          nft_id: nftId,
        },
        sale_price: event.payment.quantity, // Already in wei from Events API
        payment_token: {
          symbol: event.payment.symbol || 'ETH',
          decimals: event.payment.decimals || 18,
          usd_price: '0', // Events API doesn't provide USD price directly
        },
        maker: {
          address: event.seller?.address || '',
        },
        taker: {
          address: event.buyer?.address || '',
        },
        closing_date: event.event_timestamp,
      },
    }
  }

  /**
   * Override cleanup to also cleanup the sale bot
   */
  cleanup() {
    super.cleanup()
    this.saleBot.cleanup()
  }
}
