const {
  MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");

// Trade activity Discord channel IDs.
const CHANNEL_SALES_CHAT = process.env.CHANNEL_SALES_CHAT;
const CHANNEL_SALES = process.env.CHANNEL_SALES;
const CHANNEL_LISTINGS = process.env.CHANNEL_LISTINGS;
const CHANNEL_SQUIGGLE_SALES = process.env.CHANNEL_SQUIGGLE_SALES;

// Addresses which should be omitted entirely from event feeds.
const BAN_ADDRESSES = [
    "0x45d91f318b2abc6b569b6637c84cdb66486eb9ee",
    "0x3c3fb7e51d8cfcc9451100dddf59255c6d7fc5c2",
    "0x7058634bc1394af83aa0a3589d6b818e4c35295a",
    "0x8491fc2625aeece9abc897ef29544e825a72d66e",
    "0xbcba11ef0dc585f028d8f4442e82ee6ceecbcbba",
    "0x33d27f0bb797de3d20e519f4a192b7570c56681b",
    "0xed30fdda2d9c605ee9c519581d65de65fb58daed",
    "0x9048d24577d4c4bbf14f1020f20640b334f8c762",
    "0x3c6137504c38215fea30605b3e364a23c1d3e14f",
    "0xbd67097f6ef72f5337cb4932391e04d2d07e1a61",
    "0xb1e6f68aa3ab791f2e835d84a9c1c2b054aa3598",
    "0x2ad7d5ac35319d221b2d1c7ee9edb2e3d106962e",
    "0x438681aa97bf5ecf1fe9110d1b04ed8230e2bfad"
];

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
    for (var i = BAN_ADDRESSES.length - 1; i >= 0; i--) {
        const bannedAddress = BAN_ADDRESSES[i];
        if (description.includes(bannedAddress)) {
            console.log(`Skipping message propagation for ${bannedAddress}`);
            return;
        }
    }

    // Return early if event is a referral.
    for (var i = embed.fields.length - 1; i >= 0; i--) {
        const embedField = embed.fields[i];
        if (embedField.name.includes("Referral Reward")) {
            console.log(`Skipping message propagation for referral.`);
            return;
        }
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

    // Only forward sales events and listing events.
    if (eventName.includes("Successful")) {
        bot.channels.cache.get(CHANNEL_SALES).send(embed);
        bot.channels.cache.get(CHANNEL_SALES_CHAT).send(embed);
        // Forward all Chromie Squiggles sales on to the DAO.
        if (artBlocksData.collection_name.includes("Chromie Squiggle")) {
            bot.channels.cache.get(CHANNEL_SQUIGGLE_SALES).send(embed);
        }
    } else if (eventName.includes("Created")) {
        bot.channels.cache.get(CHANNEL_LISTINGS).send(embed);
    }
  }
}

module.exports.triageActivityMessage = triageActivityMessage;
