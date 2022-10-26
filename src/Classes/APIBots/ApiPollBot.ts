import { Client, Message } from 'discord.js'

const { ensOrAddress, getOSName } = require('./utils')
const axios = require('axios')
/** Abstract parent class for all API Poll Bots */
class APIPollBot {
  apiEndpoint: string
  refreshRateMs: number
  bot: Client
  headers: any
  listColor: string
  saleColor: string
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
  async buildDiscordMessage(msg: Message) {
    console.warn('buildDiscordMessage function not implemented!', msg)
  }

  async ensOrAddress(address: string): Promise<string> {
    return await ensOrAddress(address)
  }

  async osName(address: string): Promise<string> {
    return await getOSName(address)
  }

  buildOpenseaURL(contractAddr: string, tokenId: string): string {
    return `https://opensea.io/assets/ethereum/${contractAddr}/${tokenId}`
  }
  buildLooksRareURL(contractAddr: string, tokenId: string): string {
    return `https://looksrare.org/collections/${contractAddr}/${tokenId}`
  }
  buildX2Y2URL(contractAddr: string, tokenId: string): string {
    return `https://x2y2.io/eth/${contractAddr}/${tokenId}`
  }
}

module.exports.APIPollBot = APIPollBot
