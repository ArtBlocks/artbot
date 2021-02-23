require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");
const Web3 = require("web3");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const bot = new Client();
const TOKEN = process.env.TOKEN;
const CHANNEL_SING = process.env.CHANNEL_SING;
const CHANNEL_TRADE = process.env.CHANNEL_TRADE;
const CHANNEL_IGNITION = process.env.CHANNEL_IGNITION;
const CHANNEL_SQUIG = process.env.CHANNEL_SQUIG;
const CHANNEL_RINGERS = process.env.CHANNEL_RINGERS;
const SERVER = process.env.SERVER;

const { init } = require("./singularity");
const os = require("./osEvent");
const ignition = require("./ignition");
const squig = require("./squiggle");
const ringers = require("./ringers");
const CuratedProjectBot = require("./CuratedProjectBot").CuratedProjectBot;

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

bot.login(TOKEN);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/update", function (req, res) {
  console.log("received update with body:\n", JSON.stringify(req.body, null, 2), "\n");

  res.setHeader("Content-Type", "application/json");
  res.json({ success: true });
});

app.get("/update", function (req, res) {
  console.log("received get with body:\n", req.body, "\n");

  res.setHeader("Content-Type", "application/json");
  res.json({ success: true });
});

app.listen(PORT, function () {
  console.log("Server is listening on port ", PORT);
});

async function metaData(data, msg, url) {
  console.log(data);
  // console.log(data.asset);
  let mintAddress = "0x0000000000000000000000000000000000000000";

  let artblocks = await fetch(`https://api.artblocks.io/token/${url}`);
  let abData = await artblocks.json();
  let featureData = await init(abData["token hash"]);
  let _meta = featureData.map((item) => item).join("\n");

  const _embed = new MessageEmbed()
    // Set the title of the field
    .setTitle(data.asset.name)

    .setURL(data.asset.permalink)
    // Set the color of the embed
    .setColor(0xff0000)
    // Set the main content of the embed
    .setThumbnail(data.asset.image_url)
    .addFields({
      name: "Features",
      value: _meta,
    })
    .addFields({
      name: "Owner",
      value: `[${data.asset.owner.address.slice(
        0,
        8
      )}](https://opensea.io/accounts/${data.asset.owner.address}) ${
        data.asset.owner.user !== null
          ? `(${data.asset.owner.user.username})`
          : ""
      }`,
      inline: true,
    })

    .addFields(
      data.event_type
        ? data.event_type == "created"
          ? {
              name: "Offered At",
              value: ` ${web3.utils.fromWei(
                data.ending_price,
                "ether"
              )}Ξ on ${new Date(data.created_date).toLocaleDateString()}`,
              inline: true,
            }
          : data.event_type == "successful"
          ? {
              name: "Last Sale",
              value: `Sold for ${web3.utils.fromWei(
                data.total_price,
                "ether"
              )}Ξ on ${new Date(data.created_date).toLocaleDateString()}`,
              inline: true,
            }
          : data.event_type == "transfer"
          ? {
              name:
                data.from_account.address == mintAddress
                  ? "Minted On:"
                  : "Recent Transfer",
              value:
                data.from_account.address == mintAddress
                  ? new Date(data.created_date).toLocaleDateString()
                  : `From [${data.from_account.address.slice(
                      0,
                      8
                    )}](https://opensea.io/accounts/${
                      data.from_account.address
                    }) ${
                      data.asset.owner.user !== null
                        ? `(${data.from_account.user.username.slice(0, 10)})`
                        : ""
                    } on ${new Date(data.created_date).toLocaleDateString()}`,
              inline: true,
            }
          : data.event_type == "bid_withdrawn"
          ? {
              name: "Bid Withdrawn",
              value: ` ${web3.utils.fromWei(
                data.total_price,
                "ether"
              )}Ξ from [${data.from_account.address.slice(
                0,
                8
              )}](https://opensea.io/accounts/${data.from_account.address}) ${
                data.asset.owner.user !== null
                  ? `(${data.from_account.user.usernameslice(0, 10)})`
                  : ""
              }  on ${new Date(data.created_date).toLocaleDateString()}`,
              inline: true,
            }
          : data.event_type == "cancelled"
          ? {
              name: "Cancelled Offer",
              value: ` ${web3.utils.fromWei(
                data.total_price,
                "ether"
              )}Ξ from [${data.asset.owner.address.slice(
                0,
                8
              )}](https://opensea.io/accounts/${data.asset.owner.address}) ${
                data.asset.owner.user !== null
                  ? `(${data.asset.owner.user.username})`
                  : ""
              }  on ${new Date(data.created_date).toLocaleDateString()}`,
              inline: true,
            }
          : {
              name: "Current Bid",
              value: ` ${web3.utils.fromWei(
                data.bid_amount,
                "ether"
              )}Ξ from [${data.from_account.address.slice(
                0,
                8
              )}](https://opensea.io/accounts/${data.from_account.address}) ${
                data.from_account.user !== null
                  ? `(${data.from_account.user.username})`
                  : ""
              }  on ${new Date(data.created_date).toLocaleDateString()}`,
              inline: true,
            }
        : { name: "Last Sale", value: "No Transactions" }
    );

  msg.channel.send(_embed);
}

async function singData(msg, number) {
  _val = parseInt(number.substring(1));
  _token = _val + 8000000;
  _contract = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";
  if (_val > 1023 || _val < 0) {
    msg.channel.send("Invalid #");
  }

  await fetch(
    `https://api.opensea.io/api/v1/events?asset_contract_address=${_contract}&token_id=${_token}&only_opensea=false&offset=0&limit=5`,

    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let event = data.asset_events[0];

      metaData(event, msg, _token);
    })
    .catch((err) => {
      console.error(err);
    });
}

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

let ringersBot = new CuratedProjectBot(
  13000000,
  "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270",
  1000,
  "Ringers"
)

bot.on("message", (msg) => {
  if (msg.content.startsWith("#")) {
    if (msg.channel.id === CHANNEL_SING) {
      singData(msg, msg.content);
    }
    if (msg.channel.id === CHANNEL_IGNITION) {
      ignition.ignitionData(msg, msg.content);
    }
    if (msg.channel.id === CHANNEL_SQUIG) {
      squig.squigData(msg, msg.content);
    }
    if (msg.channel.id === CHANNEL_RINGERS) {
      ringersBot.getData(msg, msg.content);
    }
  }
});

setInterval(os.openseaEvent, 60 * 1000, bot);
