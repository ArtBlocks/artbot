const {
  MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");

// Trade activity Discord channel IDs.
const CHANNEL_TRADE = process.env.CHANNEL_TRADE;
const CHANNEL_TRADE_PLAYGROUND = process.env.CHANNEL_TRADE_PLAYGROUND;
const CHANNEL_TRADE_FACTORY = process.env.CHANNEL_TRADE_FACTORY;
const CHANNEL_SALES = process.env.CHANNEL_SALES;
const CHANNEL_LISTINGS = process.env.CHANNEL_LISTINGS;

// Addresses which should be omitted entirely from event feeds.
const BAN_ADDRESS_OSTremendousLogicalYak = "0x7058634bc1394af83aa0a3589d6b818e4c35295a";

async function triageActivityMessage(msg, bot) {
  // Iterate through entire array of embeds, though there should only
  // ever be one at a time per message.
  let embeds = msg.embeds
  for (i = 0; i < embeds.length; i++) {
    let embed = embeds[i];

    // Determine the item that the event is associated with.
    let openseaURL = embed.author.url;
    let urlComponents = openseaURL.split("/");
    let tokenID = urlComponents[urlComponents.length - 1];

    // Extract out the "author name".
    let authorName = embed.author.name;
    let authorURL = embed.author.url;
    let eventName = authorName.split(":")[0];

    // Get current description.
    let description = embed.description;

    // Return early if description includes bot-banned user.
    if (description.includes(BAN_ADDRESS_OSTremendousLogicalYak)) {
        console.log(`Skipping message propagation for ${BAN_ADDRESS_OSTremendousLogicalYak}`);
        return;
    }

    // Split off the "Description" text within the description.
    let descriptionDescriptionIndex = description.indexOf("\n**Description:**");
    description = description.substring(0, descriptionDescriptionIndex + 1);

    // Assuming that "Name" is the first field, remove it.
    let nameLineBreakIndex = description.indexOf("\n");
    let lastIndex = description.length - 1;
    description = description.substring(nameLineBreakIndex, lastIndex);

    // Update description with parsed and modified string.
    embed.setDescription(description.trim());

    // Get Art Blocks metadata response for the item.
    let artBlocksResponse = await fetch(`https://api.artblocks.io/token/${tokenID}`);
    let artBlocksData = await artBlocksResponse.json();

    // Update thumbnail image to use larger variant from Art Blocks API.
    embed.setThumbnail(artBlocksData.image);

    // Add inline field for viewing live script on Art Blocks.
    embed.addField("Live Script", `[view on artblocks.io](${artBlocksData.external_url})`, true);

    // Update to remove author name and to reflect this info in piece name
    // rather than token number as the title and URL field..
    embed.author = null;
    embed.setTitle(`${eventName}: ${artBlocksData.name}`);
    embed.setURL(authorURL);

    // Determine channel from the curation status of the piece.
    // Fall-back to factory as the default (so that no messages accidentally
    // get dropped).
    let curationStatus = artBlocksData.curation_status;
    var tradeChannel;
    if (curationStatus == "curated") {
      tradeChannel = CHANNEL_TRADE;
    } else if (curationStatus == "playground") {
      tradeChannel = CHANNEL_TRADE_PLAYGROUND;
    } else {
      tradeChannel = CHANNEL_TRADE_FACTORY;
    }

    // Forward on updated message to the per-curation status feed.
    bot.channels.cache.get(tradeChannel).send(embed);

    // Forward sales events also to special sales channel.
    if (eventName.includes("Successful")) {
        bot.channels.cache.get(CHANNEL_SALES).send(embed);
    } else if (eventName.includes("Created")) {
        bot.channels.cache.get(CHANNEL_LISTINGS).send(embed);
    }
  }
}

module.exports.triageActivityMessage = triageActivityMessage;
