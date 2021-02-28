const {
  MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");
const Web3 = require("web3");

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const MINT_ADDRESS = "0x0000000000000000000000000000000000000000";
const EMBED_COLOR = 0x00ff00;
const UNKNOWN_ADDRESS = "unknown";
const UNKNOWN_USERNAME = "unknown";

class ProjectBot {
  constructor(projectNumber, mintContract, editionNumber, projectName) {
    this.projectNumber = projectNumber;
    this.mintContract = mintContract;
    this.editionNumber = editionNumber;
    this.projectName = projectName;
  }

  async handleNumberMessage(msg) {
    let content = msg.content;
    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      );
      return;
    }

    let imageRequested = content.toLowerCase().includes("image");
    let afterTheHash = content.substring(1);
    let pieceNumber;
    if (afterTheHash.toLowerCase().includes("rand ") || afterTheHash[0] == "?") {
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

    let tokenID = pieceNumber + this.projectNumber;
    let openSeaURL = `https://api.opensea.io/api/v1/asset/${this.mintContract}/${tokenID}/`;

    await fetch(
        openSeaURL, {
          method: "GET",
          headers: {},
        }
      )
      .then((response) => response.json())
      .then((openSeaData) => {
        console.log(openSeaData, "OPENSEA DATA");
        this.sendMetaDataMessage(openSeaData, msg, tokenID, imageRequested);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async sendMetaDataMessage(openSeaData, msg, tokenID, imageRequested) {
    let artBlocksResponse = await fetch(`https://api.artblocks.io/token/${tokenID}`);
    let artBlocksData = await artBlocksResponse.json();
    console.log(artBlocksData, "ARTBLOCKS DATA");

    // If user requested large image, return just this data along with
    // a link to the OpenSea page and ArtBlocks live script.
    if (imageRequested) {
      const imageContent = new MessageEmbed()
        // Set the title of the field.
        .setTitle(openSeaData.name)
        // Add link to OpenSea listing.
        .setURL(openSeaData.permalink)
        // Set the color of the embed.
        .setColor(EMBED_COLOR)
        // Set the full image for embed.
        .setImage(openSeaData.image_url);
      msg.channel.send(imageContent);
      return;
    }

    // Otherwise, return full metadata for the asset.
    const assetFeatures = (artBlocksData.features !== null && artBlocksData.features.length) ?
      `${artBlocksData.features.join("\n")}` :
      "Not yet available.";
    const embedContent = new MessageEmbed()
      // Set the title of the field.
      .setTitle(openSeaData.name)
      // Add link to OpenSea listing.
      .setURL(openSeaData.permalink)
      // Set the color of the embed.
      .setColor(EMBED_COLOR)
      // Set the main content of the embed
      .setThumbnail(openSeaData.image_url)
      // Add "Live Script" field.
      .addField("Live Script", `[view on artblocks.io](${artBlocksData.external_url})`)
      // Add "Features" field.
      .addField("Features", assetFeatures)
      // Add sale number details.
      .addField("Total Sales", this.parseNumSales(openSeaData.num_sales))
      // Add current owner info.
      .addFields(this.parseOwnerInfo(openSeaData.owner))
      // Add sale info.
      .addFields(this.parseSaleInfo(openSeaData.last_sale));
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

  parseSaleInfo(saleInfo) {
    if (saleInfo !== null && saleInfo.event_type == "successful") {
      let eventDate = new Date(saleInfo.created_date).toLocaleDateString();
      let sellerAccount = saleInfo.transaction.to_account;
      let sellerAddress;
      let sellerAddressPreview;
      let sellerUsername;
      if (sellerAccount !== null) {
        sellerAddress = sellerAccount.address;
        sellerAddressPreview = sellerAddress !== null ?
          sellerAddress.slice(0, 8) :
          UNKNOWN_ADDRESS;
        sellerUsername = sellerAccount.user !== null ?
          sellerAccount.user.username :
          UNKNOWN_USERNAME;
        if (sellerUsername === null) {
          sellerUsername = UNKNOWN_USERNAME;
        }
      }

      return {
        name: "Last Sale",
        value: `Sold for ${web3.utils.fromWei(
                saleInfo.total_price,
                "ether"
              )}Ξ by [${sellerAddressPreview}](https://opensea.io/accounts/${
                      sellerAddress
                    }) (${sellerUsername}) on ${eventDate}`,
        inline: true,
      };
    }
    return {
      name: "Last Sale",
      value: "N/A",
      inline: true,
    };
  }

  parseNumSales(numSales) {
    if (numSales == 0) {
      return "None";
    }
    return `${numSales}`;
  }
}

module.exports.ProjectBot = ProjectBot;
