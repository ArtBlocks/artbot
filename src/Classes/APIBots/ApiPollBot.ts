import { Client, ColorResolvable } from 'discord.js'
import {
  buildOpenseaURL,
  buildLooksRareURL,
  buildX2Y2URL,
  getOSName,
} from './utils'

const axios = require('axios')
/** Abstract parent class for all API Poll Bots */
export class APIPollBot {
  apiEndpoint: string
  refreshRateMs: number
  baseRefreshRateMs: number
  bot: Client
  headers: any
  listColor: ColorResolvable
  saleColor: ColorResolvable
  sweepColor: ColorResolvable
  artblocksSaleColor: ColorResolvable
  artblocksListColor: ColorResolvable
  lastUpdatedTime: number
  intervalId?: NodeJS.Timeout
  private consecutiveRateLimits = 0
  private isPolling = false

  /**
   * Constructor
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   * @param {*} headers - Optional: any headers to supply (namely, API tokens)
   */
  constructor(
    apiEndpoint: string,
    refreshRateMs: number,
    bot: Client,
    headers = {}
  ) {
    this.apiEndpoint = apiEndpoint
    this.refreshRateMs = refreshRateMs
    this.baseRefreshRateMs = refreshRateMs
    this.bot = bot
    this.headers = headers
    this.listColor = '#407FDB'
    this.saleColor = '#62DE7C'
    this.sweepColor = '#A956FA'
    this.artblocksSaleColor = '#ffc204'
    this.artblocksListColor = '#e300cd'

    // Only send events that occur after this bot gets initialized
    this.lastUpdatedTime = Date.now()

    // Poll the specified API every refreshRateMS millis
    this.startPolling()
  }

  /**
   * Start polling the API
   */
  startPolling() {
    this.intervalId = setInterval(this.pollApi.bind(this), this.refreshRateMs)
  }

  /**
   * Stop polling the API
   */
  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }

  /**
   * Cleanup method to be called when the bot is being destroyed
   */
  cleanup() {
    this.stopPolling()
  }

  /**
   * Polls provided apiEndpoint with provided headers.
   * Skips if a previous poll is still in-flight (e.g. paginating).
   */
  async pollApi() {
    if (this.isPolling) {
      console.log('Skipping poll — previous poll still in-flight')
      return
    }
    this.isPolling = true
    try {
      const response = await this.getWithRetry(
        this.apiEndpoint,
        {
          headers: this.headers,
          timeout: 15000,
          validateStatus: (status: number) => status >= 200 && status < 500,
        },
        3
      )
      if (response.status === 429) {
        this.handleRateLimit()
        return
      }
      if (response.status >= 400) {
        console.warn(
          `API poll non-2xx response (${response.status}) for ${this.apiEndpoint}`
        )
        return
      }
      // Successful response — gradually recover polling rate
      this.recoverPollingRate()
      await this.handleAPIResponse(response.data)
    } catch (err) {
      const error = err as any
      const status = error?.response?.status
      const statusText = error?.response?.statusText
      const message = error?.message
      if (status === 429) {
        this.handleRateLimit()
        return
      }
      console.warn(
        `Error polling ${this.apiEndpoint} - status: ${status} ${statusText} message: ${message}`
      )
    } finally {
      this.isPolling = false
    }
  }

  /**
   * Called when a 429 rate limit is encountered — slows down polling
   */
  private handleRateLimit() {
    this.consecutiveRateLimits++
    // Double the interval on each consecutive 429, up to 5 minutes
    const backoffMultiplier = Math.pow(2, this.consecutiveRateLimits)
    const newRate = Math.min(
      this.baseRefreshRateMs * backoffMultiplier,
      5 * 60 * 1000
    )
    if (newRate !== this.refreshRateMs) {
      console.warn(
        `Rate limited (429) — slowing polling from ${this.refreshRateMs}ms to ${newRate}ms (${this.consecutiveRateLimits} consecutive 429s)`
      )
      this.refreshRateMs = newRate
      this.restartPolling()
    }
  }

  /**
   * Gradually recover polling rate after successful responses
   */
  private recoverPollingRate() {
    if (this.consecutiveRateLimits > 0) {
      this.consecutiveRateLimits = 0
      if (this.refreshRateMs !== this.baseRefreshRateMs) {
        console.log(
          `Rate limit cleared — restoring polling rate to ${this.baseRefreshRateMs}ms`
        )
        this.refreshRateMs = this.baseRefreshRateMs
        this.restartPolling()
      }
    }
  }

  /**
   * Restart polling with the current refreshRateMs
   */
  private restartPolling() {
    this.stopPolling()
    this.startPolling()
  }

  /**
   * Helper to GET with retries and backoff for transient network/server errors
   * Also handles 429 rate-limit responses with Retry-After header support
   */
  protected async getWithRetry(
    url: string,
    config: any,
    retries = 3,
    initialDelayMs = 1000
  ): Promise<any> {
    let attempt = 0
    let lastError: any
    while (attempt <= retries) {
      try {
        const response = await axios.get(url, config)

        // Handle 429 returned as a non-throwing response (validateStatus)
        if (response.status === 429) {
          if (attempt === retries) return response
          const retryAfter = this.parseRetryAfter(response.headers)
          const delay =
            retryAfter ?? Math.min(initialDelayMs * Math.pow(2, attempt), 30000)
          console.warn(
            `GET retry ${
              attempt + 1
            }/${retries} for ${url} - rate limited (429), waiting ${delay}ms`
          )
          await new Promise((res) => setTimeout(res, delay))
          attempt++
          continue
        }

        return response
      } catch (err: any) {
        lastError = err
        const code = err?.code || err?.response?.status
        const isTimeout =
          err?.code === 'ECONNABORTED' || /timeout/i.test(err?.message || '')
        const isReset = err?.code === 'ECONNRESET'
        const status = err?.response?.status
        const isRateLimited = status === 429
        const shouldRetry =
          isTimeout ||
          isReset ||
          isRateLimited ||
          (typeof status === 'number' && status >= 500 && status < 600)

        if (!shouldRetry || attempt === retries) {
          break
        }

        let delay: number
        if (isRateLimited) {
          // Use Retry-After header if available, otherwise longer backoff for 429s
          const retryAfter = this.parseRetryAfter(err?.response?.headers)
          delay =
            retryAfter ??
            Math.min(initialDelayMs * Math.pow(2, attempt + 1), 30000)
        } else {
          delay = Math.min(initialDelayMs * Math.pow(2, attempt), 10000)
        }
        const jitter = Math.floor(delay * 0.25 * (Math.random() * 2 - 1))
        const sleepMs = Math.max(250, delay + jitter)
        console.warn(
          `GET retry ${attempt + 1}/${retries} for ${url} after error (${
            code || status
          }): ${err?.message || 'unknown'} - waiting ${sleepMs}ms`
        )
        await new Promise((res) => setTimeout(res, sleepMs))
        attempt++
      }
    }
    throw lastError
  }

  /**
   * Parse the Retry-After header value into milliseconds
   * Supports both seconds (integer) and HTTP-date formats
   */
  private parseRetryAfter(headers: any): number | null {
    const retryAfter = headers?.['retry-after']
    if (!retryAfter) return null

    const seconds = parseInt(retryAfter, 10)
    if (!isNaN(seconds)) {
      return seconds * 1000
    }

    // Try parsing as HTTP-date
    const date = new Date(retryAfter)
    if (!isNaN(date.getTime())) {
      return Math.max(0, date.getTime() - Date.now())
    }

    return null
  }

  /**
   * "Abstact" function each ApiBot must implement
   * Parses endpoint response
   * @param {*} responseData - Dict parsed from API request json
   */
  async handleAPIResponse(responseData: any) {
    console.warn('handleAPIResponse function not implemented!', responseData)
  }

  /**
   * "Abstact" function each ApiBot must implement
   * Builds and sends any Discord messages
   * @param {*} msg - Event info dict
   */
  async buildDiscordMessage(msg: any) {
    console.warn('buildDiscordMessage function not implemented!', msg)
  }

  async osName(address: string): Promise<string> {
    return await getOSName(address)
  }
  getPlatformUrl(
    platform: string,
    contractAddress: string,
    tokenId: string,
    externalUrl: string
  ): string {
    let platformUrl = externalUrl
    if (platform.includes('opensea')) {
      platformUrl = buildOpenseaURL(contractAddress, tokenId)
    } else if (platform.includes('looksrare')) {
      platformUrl = buildLooksRareURL(contractAddress, tokenId)
    } else if (platform.includes('x2y2')) {
      platformUrl = buildX2Y2URL(contractAddress, tokenId)
    }
    return platformUrl
  }
}
