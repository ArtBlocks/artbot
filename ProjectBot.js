require("dotenv").config();
const {
  MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");
const Web3 = require("web3");

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const MINT_ADDRESS = "0x0000000000000000000000000000000000000000";
const EMBED_COLOR = 0xff0000;
const UNKNOWN_ADDRESS = "unknown";
const UNKNOWN_USERNAME = "unknown";

class ProjectBot {
  constructor(projectNumber, mintContract, editionNumber, projectName) {
    this.projectNumber = projectNumber;
    this.mintContract = mintContract;
    this.editionNumber = editionNumber;
    this.projectName = projectName;
  }

  async handleMessage(msg) {
    let content = msg.content;
    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      );
      return;
    }

    let afterTheHash = content.substring(1);
    let pieceNumber;
    if (afterTheHash.toLowerCase() == "rand" || afterTheHash[0] == "?") {
      pieceNumber = parseInt(Math.random() * this.editionNumber);
    } else {
      pieceNumber = parseInt(afterTheHash);
    }

    if (pieceNumber >= this.editionNumber || pieceNumber < 0) {
      msg.channel.send(
        `Invalid #, only ${this.editionNumber} pieces minted for ${this.projectName}.`
      );
      return;
    }

    let tokenNumber = pieceNumber + this.projectNumber;
    let openSeaURL = `https://api.opensea.io/api/v1/events?asset_contract_address=${this.mintContract}&token_id=${tokenNumber}&only_opensea=false&offset=0&limit=5`;

    await fetch(
        openSeaURL, {
          method: "GET",
          headers: {},
        }
      )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "OPENSEA DATA");
        let eventData = data.asset_events[0];
        this.metaData(eventData, msg, tokenNumber);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async metaData(eventData, msg, url) {
    let artBlocksResponse = await fetch(`https://api.artblocks.io/token/${url}`);
    let artBlocksData = await artBlocksResponse.json();
    console.log(artBlocksData, "ARTBLOCKS DATA");

    const assetFeatures = (artBlocksData.features !== null && artBlocksData.features.length) ?
      `${artBlocksData.features.join("\n")}` :
      "Not yet available.";
    const embedContent = new MessageEmbed()
      // Set the title of the field.
      .setTitle(eventData.asset.name)
      // Add link to OpenSea listing.
      .setURL(eventData.asset.permalink)
      // Set the color of the embed.
      .setColor(EMBED_COLOR)
      // Set the main content of the embed
      .setThumbnail(eventData.asset.image_url)
      // Add "Live Script" field.
      .addField("Live Script", `[view on artblocks.io](${artBlocksData.external_url})`)
      // Add "Features" field.
      .addField("Features", assetFeatures)
      // Add current owner info.
      .addFields(this.parseOwnerInfo(eventData.asset.owner))
      // Add most recent event info.
      .addFields(
        eventData.event_type !== null ?
        this.parseEventInfo(eventData) : {
          name: "Last Sale",
          value: "No Transactions"
        }
      );
    msg.channel.send(embedContent);
  }

  parseOwnerInfo(ownerAccount) {
    let address = ownerAccount.address;
    let addressPreview = address !== null ?
      address.slice(0, 8) :
      UNKNOWN_ADDRESS;
    let addressOpenSeaURL = `https://opensea.io/accounts/${address}`;
    let ownerUsername = ownerAccount.user !== null ?
      ownerAccount.user.username :
      UNKNOWN_USERNAME;
    if (ownerUsername === null) {
      ownerUsername = UNKNOWN_USERNAME;
    }

    return {
      name: "Owner",
      value: `[${addressPreview}](${addressOpenSeaURL}) (${ownerUsername})`,
      inline: true,
    };
  }

  parseEventInfo(eventData) {
    let eventType = eventData.event_type;
    let eventDate = new Date(eventData.created_date).toLocaleDateString();

    let ownerAccount = eventData.asset.owner;
    let ownerAddress = ownerAccount.address;
    let ownerAddressPreview = ownerAddress !== null ?
      ownerAddress.slice(0, 8) :
      UNKNOWN_ADDRESS;
    let ownerUsername = ownerAccount.user !== null ?
      ownerAccount.user.username :
      UNKNOWN_USERNAME;
    if (ownerAccount !== null) {
      ownerAddress = ownerAccount.address;
      ownerAddressPreview = ownerAddress !== null ?
        ownerAddress.slice(0, 8) :
        UNKNOWN_ADDRESS;
      ownerUsername = ownerAccount.user !== null ?
        ownerAccount.user.username :
        UNKNOWN_USERNAME;
      if (ownerUsername === null) {
        ownerUsername = UNKNOWN_USERNAME;
      }
    }

    let fromAccount = eventData.from_account;
    let fromAddress;
    let fromAddressPreview;
    let fromUsername;
    if (fromAccount !== null) {
      fromAddress = fromAccount.address;
      fromAddressPreview = fromAddress !== null ?
        fromAddress.slice(0, 8) :
        UNKNOWN_ADDRESS;
      fromUsername = fromAccount.user !== null ?
        fromAccount.user.username :
        UNKNOWN_USERNAME;
      if (fromUsername === null) {
        fromUsername = UNKNOWN_USERNAME;
      }
    }

    switch (eventType) {
      case "created":
        return {
          name: "Offered At",
          value: ` ${web3.utils.fromWei(
                  eventData.ending_price,
                  "ether"
                )}Ξ on ${eventDate}`,
          inline: true,
        };

      case "successful":
        return {
          name: "Last Sale",
          value: `Sold for ${web3.utils.fromWei(
                  eventData.total_price,
                  "ether"
                )}Ξ on ${eventDate}`,
          inline: true,
        };

      case "transfer":
        if (fromAddress == MINT_ADDRESS) {
          return {
            name: "Minted On:",
            value: `${eventDate}`,
            inline: true,
          };
        }
        return {
          name: "Recent Transfer",
          value: `From [${fromAddressPreview}](https://opensea.io/accounts/${
                        fromAddress
                      }) (${fromUsername}) on ${eventDate}`,
          inline: true,
        };

      case "bid_withdrawn":
        return {
          name: "Bid Withdrawn",
          value: ` ${web3.utils.fromWei(
                    eventData.total_price,
                    "ether"
                  )}Ξ from [${fromAddressPreview}](https://opensea.io/accounts/${fromAddress}) (${fromUsername}) on ${eventDate}`,
          inline: true,
        };

      case "cancelled":
        return {
          name: "Canceled Offer",
          value: ` ${web3.utils.fromWei(
                  eventData.total_price,
                  "ether"
                )}Ξ from [${ownerAddressPreview}](https://opensea.io/accounts/${ownerAddress}) (${ownerUsername}) on ${eventDate}`,
          inline: true,
        };

      default:
        return {
          name: "Current Bid",
          value: ` ${web3.utils.fromWei(
                  eventData.bid_amount,
                  "ether"
                )}Ξ from [${fromAddressPreview}](https://opensea.io/accounts/${fromAddress}) (${fromUsername}) on ${eventDate}`,
          inline: true,
        }
    }
  }
}

module.exports.ProjectBot = ProjectBot;
