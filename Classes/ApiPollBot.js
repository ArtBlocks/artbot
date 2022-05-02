const fetch = require('node-fetch');
const {triageLooksRareMessage} = require('../Utils/activityTriager');

/** Abstract parent class for all API Poll Bots */
class ApiPollBot {
  /**
   * Constructor
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   * @param {*} headers - Optional: any headers to supply (namely, API tokens)
   */
  constructor(apiEndpoint, refreshRateMs, bot, headers = {}) {
    this.apiEndpoint = apiEndpoint;
    this.refreshRateMs = refreshRateMs;
    this.bot = bot;
    this.headers = headers;

    // Only send events that occur after this bot gets initialized
    this.lastUpdatedTime = Date.now();

    // Poll the specified API every refreshRateMS millis
    // (the .bind is needed for some JS weirdness with setInterval and 'this')
    setInterval(this.pollApi.bind(this), this.refreshRateMs);
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
          this.handleAPIResponse(responseData);
        })
        .catch((err) => {
          console.log(err);
          console.warn(
              `Error encountered when polling endpoint: ${this.apiEndpoint}`,
          );
        });
  }

  /**
   * "Abstact" function each ApiBot must implement - parses endpoint response
   * @param {*} responseData - Dict parsed from API request json
   */
  handleAPIResponse(responseData) {
    console.warn('handleAPIResponse function not implemented!');
  }
}

/** API Poller for LooksRare List and Sale events */
class LooksRareApiPollBot extends ApiPollBot {
  /** Constructor just calls super
   * @param {string} apiEndpoint - Endpoint to be hitting
   * @param {number} refreshRateMs - How often to poll the endpoint (in ms)
   * @param {*} bot - Discord bot that will be sending messages
   */
  constructor(apiEndpoint, refreshRateMs, bot) {
    super(apiEndpoint, refreshRateMs, bot);
  }

  /**
   * Parses and handles LooksRare API endpoint data
   * Only sends events that are new
   * Response spec: https://looksrare.github.io/api-docs/#/Events/EventController.getEvents
   * @param {*} responseData - Dict parsed from API request json
   */
  handleAPIResponse(responseData) {
    let maxTime = 0;
    for (const data of responseData.data) {
      const eventTime = Date.parse(data.createdAt);

      // Only deal with event if it is new
      if (this.lastUpdatedTime < eventTime) {
        triageLooksRareMessage(data, this.bot);
      }

      // Save the time of the latest event from this batch
      if (maxTime < eventTime) {
        maxTime = eventTime;
      }
    }

    // Update latest time vars if batch has new latest time
    if (maxTime > this.lastUpdatedTime) {
      this.lastUpdatedTime = maxTime;
    }
  }
}

module.exports.LooksRareApiPollBot = LooksRareApiPollBot;
