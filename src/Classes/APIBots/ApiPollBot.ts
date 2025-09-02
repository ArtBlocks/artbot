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
  bot: Client
  headers: any
  listColor: ColorResolvable
  saleColor: ColorResolvable
  sweepColor: ColorResolvable
  artblocksSaleColor: ColorResolvable
  artblocksListColor: ColorResolvable
  lastUpdatedTime: number
  intervalId?: NodeJS.Timeout

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
   * Polls provided apiEndpoint with provided headers
   */
  async pollApi() {
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
      if (response.status >= 400) {
        console.warn(
          `API poll non-2xx response (${response.status}) for ${this.apiEndpoint}`
        )
        return
      }
      await this.handleAPIResponse(response.data)
    } catch (err) {
      const error = err as any
      const status = error?.response?.status
      const statusText = error?.response?.statusText
      const message = error?.message
      console.warn(
        `Error polling ${this.apiEndpoint} - status: ${status} ${statusText} message: ${message}`
      )
    }
  }

  /**
   * Helper to GET with retries and backoff for transient network/server errors
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
        return await axios.get(url, config)
      } catch (err: any) {
        lastError = err
        const code = err?.code || err?.response?.status
        const isTimeout =
          err?.code === 'ECONNABORTED' || /timeout/i.test(err?.message || '')
        const isReset = err?.code === 'ECONNRESET'
        const status = err?.response?.status
        const shouldRetry =
          isTimeout ||
          isReset ||
          (typeof status === 'number' && status >= 500 && status < 600)

        if (!shouldRetry || attempt === retries) {
          break
        }

        const delay = Math.min(initialDelayMs * Math.pow(2, attempt), 10000)
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
