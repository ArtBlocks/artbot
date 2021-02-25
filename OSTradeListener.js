const {
  MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");
const Web3 = require("web3");

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// TODO: Clean up this class and consolidate duplicated logic across
//       this class and ProjectBot.js
class OSTradeListener {
  constructor(bot, channelID, collectionName, pollInterval) {
    this.bot = bot;
    this.channelID = channelID;
    this.collectionName = collectionName;
    this.pollInterval = pollInterval;
  }

  sendMessage(msg) {
    this.bot.channels.cache.get(this.channelID).send(msg);
  }

  // Poll for trade events.
  async pollTradeEvents() {
    let oneMinuteAgo = new Date(Date.now() - this.pollInterval);
    console.log(oneMinuteAgo, "AGO");
    let occuredAfterDate = Date.parse(oneMinuteAgo);

    await fetch(
        `https://api.opensea.io/api/v1/events?only_opensea=false&collection_slug=${this.collectionName}&offset=0&limit=200&occurred_after=${occuredAfterDate}`
      )
      .then((response) => response.json())
      .then(async (data) => {
        if (data.asset_events.length > 0) {
          console.log("ASSET EVENTS:");
          console.log(data.asset_events);
          data.asset_events.map(async (data) => {
            this.eventType(data);
          });
        } else {
          console.log("No new trade events.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async eventType(event) {
    let details = {};
    switch (event.event_type) {
      case "created":
        if (event.asset == null) {
          console.log(event.name, "BUNDLE HERE");
          break;
        }
        details = {
          event_type: `New Listing`,
          event_description: "has been listed for sale.",
          color: "#0062FF",
          name: "Offered At",
          value: ` ${web3.utils.fromWei(
            event.starting_price,
            "ether"
          )}Ξ by [${event.from_account.address.slice(
            0,
            8
          )}](https://opensea.io/accounts/${event.from_account.address}) ${
            event.from_account.user !== null
              ? `(${safeUnwrapUsername(event.from_account.user.username).trunc(8, false)})`
              : ""
          } on ${new Date(event.created_date).toLocaleDateString()}`,
          inline: true,
          data: event,
        };
        this.embed(details);
        break;
      case "successful":
        details = {
          event_type: `New Sale`,
          event_description: "has been sold to a new owner, congrats!",
          color: "#23FF00",
          name: "Last Sale",
          value: `Sold for ${web3.utils.fromWei(
            event.total_price,
            "ether"
          )}Ξ on ${new Date(event.created_date).toLocaleDateString()}`,
          inline: true,
          data: event,
        };
        this.embed(details);
        break;
      case "bid_entered":
        details = {
          event_type: `New Bid`,
          event_description: "has a new bid.",
          color: "#FFA300",
          name: "Current Bid",
          value: ` ${web3.utils.fromWei(
            event.bid_amount,
            "ether"
          )}Ξ from [${event.from_account.address.slice(
            0,
            8
          )}](https://opensea.io/accounts/${event.from_account.address}) ${
            event.from_account.user !== null
              ? `(${safeUnwrapUsername(event.from_account.user.username).trunc(8, false)})`
              : ""
          }  on ${new Date(event.created_date).toLocaleDateString()}`,
          inline: true,
          data: event,
        };
        this.embed(details);
        break;
      case "bid_withdrawn":
        details = {
          event_type: `Bid Withdrawn`,
          event_description: "bid has been withdrawn.",
          color: "#FFDB00",
          name: "Bid Withdrawn",
          value: ` ${web3.utils.fromWei(
            event.total_price,
            "ether"
          )}Ξ from [${event.from_account.address.slice(
            0,
            8
          )}](https://opensea.io/accounts/${event.from_account.address}) ${
            event.from_account.user.username !== null
              ? `(${safeUnwrapUsername(event.from_account.user.username).trunc(8, false)})`
              : ""
          }  on ${new Date(event.created_date).toLocaleDateString()}`,
          inline: true,
          data: event,
        };
        this.embed(details);
        break;
      case "cancelled":
        details = {
          event_type: `Listing Cancelled`,
          event_description: "has been removed from listings.",
          color: "#FF000A",

          name: "Canceled Offer",
          value: `[${event.seller.address.slice(
            0,
            8
          )}](https://opensea.io/accounts/${event.seller.address}) ${
            safePathGet(["seller", "user", "username"], event) !== null || "NULL"
              ? `(${safePathGet(["seller", "user", "username"], event)})`
              : `(${event.seller.user.address.slice(0, 8)})`
          }  has withdrawn their bid on ${new Date(
            event.created_date
          ).toLocaleDateString()}`,
          inline: true,
          data: event,
        };
        this.embed(details);
        break;
      case "offer_entered":
        details = {
          event_type: `New Bid`,
          event_description: "has a new bid.",
          color: "#FFA300",
          name: "Current Bid",
          value: ` ${web3.utils.fromWei(
            event.bid_amount,
            "ether"
          )}Ξ from [${event.from_account.address.slice(
            0,
            8
          )}](https://opensea.io/accounts/${event.from_account.address}) ${
            event.from_account.user !== null
              ? `(${safeUnwrapUsername(event.from_account.user.username).trunc(8, false)})`
              : ""
          }  on ${new Date(event.created_date).toLocaleDateString()}`,
          inline: true,
          data: event,
        };
        this.embed(details);
        break;
      case "transfer":
        break;
      default:
        console.log(event, "HIT BOTTOM OF CASE");
    }
  }

  async embed(details) {
    const _embed = new MessageEmbed()
      // Set the title of the field
      .setTitle(details.event_type)
      .setDescription(
        `[${
          safePathGet(["data", "asset", "name"], details)
        }](${`https://artblocks.io/token/${safePathGet(["data", "asset", "token_id"], details)}`}) ${
          details.event_description
        }`
      )
      .setURL(safePathGet(["data", "asset", "permalink"], details))
      // Set the color of the embed
      .setColor(details.color)
      // Set the main content of the embed
      .setThumbnail(safePathGet(["data", "asset", "image_url"], details))
      .addFields({
        name: details.name,
        value: details.value
      });
    this.sendMessage(_embed);
  }
}

// Helper utilities.
String.prototype.trunc = function(n, useWordBoundary) {
  console.log(this);
  var isTooLong = this.length > n,
    s_ = isTooLong ? this.substr(0, n - 1) : this;
  s_ = useWordBoundary && isTooLong ? s_.substr(0, s_.lastIndexOf(" ")) : s_;
  return isTooLong ? s_ : s_;
};

function safePathGet(path, object) {
  return path.reduce((object, key) => (object && object[key]) ? object[key] : null, object);
}

// TODO: Move this to a shared util that can be used by ProjectBot.js
function safeUnwrapUsername(username) {
  if (username) {
    if (username === "null") {
      return "unknown";
    } else {
      return username;
    }
  } else {
    return "unknown";
  }
}

module.exports.OSTradeListener = OSTradeListener;
