require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");
const Web3 = require("web3");
const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const bot = new Client();
const TOKEN = process.env.TOKEN;
const CHANNEL_SING = process.env.CHANNEL_SING;
const CHANNEL_TRADE = process.env.CHANNEL_TRADE;
const SERVER = process.env.SERVER;

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

bot.login(TOKEN);

async function metaData(data, msg, url) {
  let mintAddress = "0x0000000000000000000000000000000000000000";

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.goto(`https://api.artblocks.io/generator/${url}`);
  let meta = await page.evaluate(() => init(tokenData.hash));

  // Not currently being used
  //   let formData = await page.evaluate(() =>
  //     process_formdata(process_hash(tokenData.hash))
  //   );
  //   console.log(formData, "OUTPUT");

  let _meta = meta.map((item) => item).join("\n");

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
                        ? `(${data.from_account.user.username})`
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
                  ? `(${data.from_account.user.username})`
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
              )}Ξ from [${data.from_account.address.slice(
                0,
                8
              )}](https://opensea.io/accounts/${data.from_account.address}) ${
                data.asset.owner.user !== null
                  ? `(${data.from_account.user.username})`
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
                data.asset.owner.user !== null
                  ? `(${data.from_account.user.username})`
                  : ""
              }  on ${new Date(data.created_date).toLocaleDateString()}`,
              inline: true,
            }
        : { name: "Last Sale", value: "No Transactions" }
    );

  msg.channel.send(_embed);

  await browser.close();
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

const eventType = async (event) => {
  console.log(event, "THE EVENT");
  switch (event) {
    case "created":
      return `New Offer`;
      break;
    case "successful":
      return `New Sale`;
      break;
    case "bid_entered":
      return `New Offer`;
      break;
    case "bid_withdrawn":
      return `Bid Withdrawn`;
      break;
    case "cancelled":
      return `Offer Cancelled`;
      break;
    default:
      console.log("dont know");
  }
};

const openseaEvent = async (msg) => {
  var aMinuteAgo = new Date(Date.now() - 1000 * 60);
  console.log(aMinuteAgo);

  let mintAddress = "0x0000000000000000000000000000000000000000";

  await fetch(
    "https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270&offset=0&limit=3&occurred_after=" +
      Date.parse(aMinuteAgo),
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      if (data.asset_events.length > 0) {
        console.log(data.asset_events);

        data.asset_events.map(async (data) => {
          let eventName = await eventType(data.event_type);
          if (data.event_type == "transfer") {
          } else {
            const _embed = new MessageEmbed()
              // Set the title of the field
              .setTitle(eventName)

              .setDescription(`${data.asset.name} has a ${eventName}.`)

              .setURL(`https://artblocks.io/token/${data.asset.token_id}`)
              // Set the color of the embed
              .setColor(0xff0000)
              // Set the main content of the embed

              .setThumbnail(data.asset.image_url)
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
                        )}Ξ on ${new Date(
                          data.created_date
                        ).toLocaleDateString()}`,
                        inline: true,
                      }
                    : data.event_type == "successful"
                    ? {
                        name: "Last Sale",
                        value: `Sold for ${web3.utils.fromWei(
                          data.total_price,
                          "ether"
                        )}Ξ on ${new Date(
                          data.created_date
                        ).toLocaleDateString()}`,
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
                                  ? `(${data.from_account.user.username})`
                                  : ""
                              } on ${new Date(
                                data.created_date
                              ).toLocaleDateString()}`,
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
                        )}](https://opensea.io/accounts/${
                          data.from_account.address
                        }) ${
                          data.asset.owner.user !== null
                            ? `(${data.from_account.user.username})`
                            : ""
                        }  on ${new Date(
                          data.created_date
                        ).toLocaleDateString()}`,
                        inline: true,
                      }
                    : data.event_type == "cancelled"
                    ? {
                        name: "Cancelled Offer",
                        value: ` ${web3.utils.fromWei(
                          data.total_price,
                          "ether"
                        )}Ξ from [${data.from_account.address.slice(
                          0,
                          8
                        )}](https://opensea.io/accounts/${
                          data.from_account.address
                        }) ${
                          data.asset.owner.user !== null
                            ? `(${data.from_account.user.username})`
                            : ""
                        }  on ${new Date(
                          data.created_date
                        ).toLocaleDateString()}`,
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
                        )}](https://opensea.io/accounts/${
                          data.from_account.address
                        }) ${
                          data.asset.owner.user !== null
                            ? `(${data.from_account.user.username})`
                            : ""
                        }  on ${new Date(
                          data.created_date
                        ).toLocaleDateString()}`,
                        inline: true,
                      }
                  : { name: "Last Sale", value: "No Transactions" }
              );
            bot.channels.cache.get(CHANNEL_TRADE).send(_embed);
          }
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
setInterval(openseaEvent, 60 * 1000);
