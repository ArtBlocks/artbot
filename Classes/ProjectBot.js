const {
  MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");
const Web3 = require("web3");
const { ProjectHandlerHelper } = require("./ProjectHandlerHelper");

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const MINT_ADDRESS = "0x0000000000000000000000000000000000000000";
const EMBED_COLOR = 0xff0000;
const UNKNOWN_ADDRESS = "unknown";
const UNKNOWN_USERNAME = "unknown";

class ProjectBot {
  constructor({ projectNumber, coreContract, editionSize, projectName, namedMappings }) {
    this.projectNumber = projectNumber;
    this.coreContract = coreContract;
    this.editionSize = editionSize;
    this.projectName = projectName;
    this.namedMappings = namedMappings ? ProjectBot.getProjectHandlerHelper(namedMappings) : null;
  }

  static getProjectHandlerHelper({ singles, sets }) {
    let singlesMap = singles ? require(`../NamedMappings/${singles}`) : null;
    let setsMap = sets ? require(`../NamedMappings/${sets}`) : null;
    return new ProjectHandlerHelper(singlesMap, setsMap);
  }

  async handleNumberMessage(msg) {
    let content = msg.content;
    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      );
      return;
    }

    // decode any mappings
    if (this.namedMappings) {
      content = this.namedMappings.transform(content);
    }

    let detailsRequested = content.toLowerCase().includes("detail");
    let afterTheHash = content.substring(1);
    let pieceNumber;
    if (afterTheHash[0] == "?") {
      pieceNumber = parseInt(Math.random() * this.editionSize);
    } else {
      pieceNumber = parseInt(afterTheHash);
    }

    if (pieceNumber >= this.editionSize || pieceNumber < 0) {
      msg.channel.send(
        `Invalid #, only ${this.editionSize} pieces minted for ${this.projectName}.`
      );
      return;
    }

    let tokenID = pieceNumber + (this.projectNumber * 1e6);
    let openSeaURL = `https://api.opensea.io/api/v1/asset/${this.coreContract}/${tokenID}/`;

    await fetch(
        openSeaURL, {
          method: "GET",
          headers: {
            'X-API-KEY': process.env.OPENSEA_API_KEY
          },
        }
      )
      .then((response) => response.json())
      .then((openSeaData) => {
        console.log(openSeaData, "OPENSEA DATA");
        this.sendMetaDataMessage(openSeaData, msg, tokenID, detailsRequested);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async sendMetaDataMessage(openSeaData, msg, tokenID, detailsRequested) {
    let artBlocksResponse = await fetch(`https://token.artblocks.io/${tokenID}`);
    let artBlocksData = await artBlocksResponse.json();
    console.log(artBlocksData, "ARTBLOCKS DATA");

    // If user did *not* request full details, return just a large image,
    // along with a link to the OpenSea page and ArtBlocks live script.
    if (!detailsRequested) {
      const imageContent = new MessageEmbed()
        // Set the title of the field.
        .setTitle(openSeaData.name)
        // Add link to OpenSea listing.
        .setURL(openSeaData.permalink)
        // Add "Live Script" field.
        .addField("Want More Info?", `Add "details" to your ArtBot command or [view on artblocks.io](${artBlocksData.external_url}).`)
        // Set the full image for embed.
        .setImage(artBlocksData.image);
      msg.channel.send(imageContent);
      return;
    }

    // Otherwise, return full metadata for the asset.
    const { features } = artBlocksData;
    const assetFeatures = (!!features && Object.keys(features).length) ?
      Object.keys(features).map(key => `${key}: ${features[key]}`).join("\n"):
      "Not yet available.";
    const embedContent = new MessageEmbed()
      // Set the title of the field.
      .setTitle(openSeaData.name)
      // Add link to OpenSea listing.
      .setURL(openSeaData.permalink)
      // Set the color of the embed.
      .setColor(EMBED_COLOR)
      // Set the main content of the embed
      .setThumbnail(openSeaData.image_thumbnail_url)
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
