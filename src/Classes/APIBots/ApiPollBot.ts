import { Client, ColorResolvable } from 'discord.js'
import { buildOpenseaURL, buildLooksRareURL, buildX2Y2URL } from './utils'

const { getOSName } = require('./utils')
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
    // (the .bind is needed for some JS weirdness with setInterval and 'this')
    setInterval(this.pollApi.bind(this), this.refreshRateMs)
  }

  /**
   * Polls provided apiEndpoint with provided headers
   */
  async pollApi() {
    try {
      const response = await axios.get(this.apiEndpoint, {
        headers: this.headers,
      })
      await this.handleAPIResponse(response.data)
    } catch (err) {
      console.log(err)
      console.warn(
        `Error encountered when polling endpoint: ${this.apiEndpoint}`
      )
    }
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
