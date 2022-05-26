const fetch = require('node-fetch')

/** Abstract parent class for all API Poll Bots */
class APIPollBot {
  /**
   * Constructor
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   * @param {*} headers - Optional: any headers to supply (namely, API tokens)
   */
  constructor(apiEndpoint, refreshRateMs, bot, headers = {}) {
    this.apiEndpoint = apiEndpoint
    this.refreshRateMs = refreshRateMs
    this.bot = bot
    this.headers = headers

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
    https: await fetch(this.apiEndpoint, {
      method: 'GET',
      headers: this.headers,
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.handleAPIResponse(responseData)
      })
      .catch((err) => {
        console.log(err)
        console.warn(
          `Error encountered when polling endpoint: ${this.apiEndpoint}`
        )
      })
  }

  /**
   * "Abstact" function each ApiBot must implement
   * Parses endpoint response
   * @param {*} responseData - Dict parsed from API request json
   */
  handleAPIResponse(responseData) {
    console.warn('handleAPIResponse function not implemented!')
  }

  /**
   * "Abstact" function each ApiBot must implement
   * Builds and sends any Discord messages
   * @param {*} msg - Event info dict
   */
  async buildDiscordMessage(msg) {
    console.warn('buildDiscordMessage function not implemented!')
  }
}

module.exports.APIPollBot = APIPollBot
