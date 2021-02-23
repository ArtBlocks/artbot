require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Web3 = require("web3");

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
var _bot;

async function metaData(data, msg, url) {
  //   console.log(data);
  // console.log(data.asset);
  let mintAddress = "0x0000000000000000000000000000000000000000";

  let artblocks = await fetch(`https://api.artblocks.io/token/${url}`);
  let abData = await artblocks.json();

  console.log(abData, "ABDATA");

  const _embed = new MessageEmbed()
    // Set the title of the field
    .setTitle(data.asset.name)

    .setURL(data.asset.permalink)
    // Set the color of the embed
    .setColor(0xff0000)
    // Set the main content of the embed
    .setThumbnail(data.asset.image_url)
    .addField("Features", `[view on artblocks.io](${abData.external_url})`)
    .addField("Live Script", `${abData.features.join("\n")}`)
    // .addFields({
    //   name: "Features",
    //   value: featureData,
    // })
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
                  ? `(${data.from_account.user.username.slice(0, 10)})`
                  : ""
              }  on ${new Date(data.created_date).toLocaleDateString()}`,
              inline: true,
            }
        : { name: "Last Sale", value: "No Transactions" }
    );

  msg.channel.send(_embed);
}

async function ringerData(msg, number) {
  _val = parseInt(number.substring(1));
  _token = _val + 13000000;
  _contract = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";
  if (_val > 999 || _val < 0) {
    msg.channel.send("Invalid #, only 1000 Ringers minted.");
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
      console.log(data, "LOG DATA");
      let event = data.asset_events[0];

      metaData(event, msg, _token);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { ringerData };
