require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");
const Web3 = require("web3");
const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const bot = new Client();
const TOKEN = process.env.TOKEN;
const CHANNEL_SING = process.env.CHANNEL_SING;
const SERVER = process.env.SERVER;

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

bot.login(TOKEN);

async function metaData(data, msg, url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.goto(`https://api.artblocks.io/generator/${url}`);
  let meta = await page.evaluate(() => init(tokenData.hash));
  let formData = await page.evaluate(() =>
    process_formdata(process_hash(tokenData.hash))
  );
  console.log(formData, "OUTPUT");
  let _meta = meta.map((item) => item).join(",");
  const _embed = new MessageEmbed()
    // Set the title of the field
    .setTitle(data.name)

    .setURL(data.external_link)
    // Set the color of the embed
    .setColor(0xff0000)
    // Set the main content of the embed
    .setImage(data.image_url)
    .setDescription(data.description)
    .addFields({
      name: "Owner",
      value: `[${data.owner.address.slice(0, 8)}](https://opensea.io/accounts/${
        data.owner.address
      }) ${data.owner.user !== null ? `(${data.owner.user.username})` : ""}`,
      inline: true,
    })

    .addFields(
      data.last_sale
        ? {
            name: "Last Sale",
            value: `Sold for ${web3.utils.fromWei(
              data.last_sale.total_price,
              "ether"
            )}Ξ on ${new Date(
              data.last_sale.event_timestamp
            ).toLocaleDateString()}`,
            inline: true,
          }
        : { name: "Last Sale", value: "No Transactions", inline: true }
    )
    .addFields({ name: "# Sold", value: data.num_sales, inline: true })
    .addFields(
      {
        name: "AB Meta",
        value: _meta,
      },
      {
        name: "Saturation Value",
        value: formData.saturation * 100,
      }
    );

  console.log(meta);

  msg.channel.send(_embed);

  await browser.close();
}

async function singData(msg, number) {
  _val = parseInt(number.substring(1));
  _url = _val + 8000000;
  if (_val > 1023 || _val < 0) {
    msg.channel.send("Invalid #");
  }

  await fetch(
    "https://api.opensea.io/api/v1/asset/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/" +
      (_val + 8000000),
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      metaData(data, msg, _url);
    })
    .catch((err) => {
      console.error(err);
    });
}

const openseaEvent = async (msg) => {
  var d1 = new Date(),
    d2 = new Date(d1);
  d2.setMinutes(d1.getMinutes() - 1000);
  console.log(d1);

  const pastTime = Math.round(d2 / 1000 + 60 * 60 * 24);
  console.log(pastTime);
  await fetch(
    "https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270&offset=0&limit=5&occurred_after=" +
      "2021-01-01T15:04:44.041Z",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.asset_events.length);
      if (data.asset_events.length > 0) {
        console.log(data.asset_events);
        const embed = new MessageEmbed()
          // Set the title of the field
          .setTitle(data.name)

          .setURL(data.external_link)
          // Set the color of the embed
          .setColor(0xff0000)
          // Set the main content of the embed
          .setImage(data.image_url)
          .setDescription(data.description)
          .addFields({
            name: "Owner",
            value: `[${data.owner.address.slice(
              0,
              8
            )}](https://opensea.io/accounts/${data.owner.address}) ${
              data.owner.user !== null ? `(${data.owner.user.username})` : ""
            }`,
            inline: true,
          })

          .addFields(
            {
              name: "Event Type",
              value: data.offer_entered,
              inline: true,
            },
            {
              name: "Amount",
              value:
                data.offer_entered == "offer_entered"
                  ? data.bid_amount
                  : data.ending_price,
            }
          );

        data.asset_events.map((item) => {
          bot.channels.cache.get(CHANNEL_SING).send(item.asset.permalink);
        });
      } else {
        console.log("no changes");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (msg.content.startsWith("#")) {
    if (msg.channel.id === CHANNEL_SING) {
      singData(msg, msg.content);
    }
  }
});
// setInterval(openseaEvent, 120000);
