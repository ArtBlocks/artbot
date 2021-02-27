require("dotenv").config();
const {
  MessageEmbed
} = require("discord.js");

// General main Discord channel ID.
const CHANNEL_GENERAL = process.env.CHANNEL_GENERAL;

// ArtBot details..
const ARTBOT_USERNAME = "artbot";
const ARTBOT_GREEN = 0x00ff00;

// Custom message shown when someone asks why Squiggle minting is paused.
const SQUIGGLE_PAUSE_MESSAGE = new MessageEmbed()
  // Set the title of the field
  .setTitle('Why is Squiggle minting paused?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(`It looks like you're wondering about why Chromie Squiggle minting is paused.The tl;dr is that all normal minting is over and the remaining Squiggles are reserved for special occasions!\n\nFor more details, check out the [#squiggle-announcements](https://discord.com/channels/411959613370400778/800461920008273962/800464186924466187) channel.`);

// Custom message shown when someone asks about when the next drop is.
const NEXT_DROP_MESSAGE = new MessageEmbed()
  // Set the title of the field
  .setTitle('When is the next drop?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(`It looks like you're wondering about when the next drop is.\n\nCheck for details on upcoming scheduled releases in the [#events](https://discord.com/channels/411959613370400778/800784659940245504) and [#announcements](https://discord.com/channels/411959613370400778/781730104337235968) channels.`);

// Custom message shown when someone asks what the "Factory" is.
const FACTORY_MESSAGE = new MessageEmbed()
  // Set the title of the field
  .setTitle('What is the ArtBlocks Factory?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(`It looks like you're wondering what the ArtBlocks Factory is.\n\nCheck out [this explaination from snowfro@](https://discord.com/channels/411959613370400778/411959613370400780/814171687133511720) :).`);

// Custom message shown when someone asks what the "Playground" vs. "Curated" is.
const PLAYGROUND_VS_CURATED_MESSAGE = new MessageEmbed()
  // Set the title of the field
  .setTitle('How are "Curated" and "Playground" different?')
  // Set the color of the embed
  .setColor(ARTBOT_GREEN)
  // Set the main content of the embed
  .setDescription(`It looks like you're wondering about the difference between Curated Projects and the Artist Playground. Here is the tl;dr:\n\nArt Blocks as a platform has established a curation board to carefully select projects for inclusion in the "official" Art Blocks Curated Collection.\n\nArtists that have been included in the Curated Collection are then allowed to deploy a project of their choice in the Artist Playground. These projects are not "curated" and subsequently are not promoted as an official Art Blocks drop or considered to be part of the "official" Art Blocks collection.\n\nCheck out [artblocks.io/learn](https://artblocks.io/learn) for a full explanation!`);

// Returns a message for ArtBot to return when being smart, or null if
// ArtBot has nothing to say.
function smartBotResponse(msgContentLowercase, msgAuthor, artBotID) {
    // NOTE: It is important to check if the message author is the ArtBot
    //       itself to avoid a recursive infinite loop.
    if (msgAuthor == ARTBOT_USERNAME) {
        return null;
    }

    // Some shared helper variables.
    let inGeneralChannel = (channelID == CHANNEL_GENERAL);
    let mentionedArtBot = msgContentLowercase.includes(ARTBOT_USERNAME) ||
      msgContentLowercase.includes(artBotID);
    let mentionedArtBotOrInGeneral = mentionedArtBot || inGeneralChannel;
    let containsQuestion = msgContentLowercase.includes("?");

    // Handle questions about the mint pausing for Chromie Squiggles.
    let inSquiggleChannel = (channelID == CHANNEL_SQUIG);
    // Both "pause" and "stopped" are keywords.
    let mentionsPause = msgContentLowercase.includes("pause") ||
      msgContentLowercase.includes("stopped");
    // Handle some common misspellings of "squiggle":
    // “squigle”, “squigglle”, “squiglle”
    let messageMentionsSquiggle = msgContentLowercase.includes("squiggle") ||
      msgContentLowercase.includes("squigle") ||
      msgContentLowercase.includes("squigglle") ||
      msgContentLowercase.includes("squiglle");
    let squiggleChannelPauseMentioned = mentionsPause && inSquiggleChannel;
    let generalChannelSquigglePauseMentioned = mentionsPause &&
      messageMentionsSquiggle &&
      mentionedArtBotOrInGeneral;
    if (squiggleChannelPauseMentioned || generalChannelSquigglePauseMentioned) {
      return SQUIGGLE_PAUSE_MESSAGE;
    }

    // Only answer the following questions if ArtBlot is pinged directly
    // or the message was sent in #general.
    if (mentionedArtBotOrInGeneral) {
        return null;
    }

    // Handle drop questions by sending a link to #events
    let mentionsDrop = msgContentLowercase.includes("drop");
    if (containsQuestion && mentionsDrop) {
        return NEXT_DROP_MESSAGE;
    }
    // Handle questions about factory by redirecting to:
    // https://discord.com/channels/411959613370400778/411959613370400780/814171687133511720
    let mentionsFactory = msgContentLowercase.includes("factory");
    if (containsQuestion && mentionsFactory) {
        return FACTORY_MESSAGE;
    }
    // Handle questions about Curated Projects vs. Artist Playground.
    let mentionedCuratedOrPlayground = msgContentLowercase.includes("curated") ||
    msgContentLowercase.includes("playground");
    if (containsQuestion && mentionedCuratedOrPlayground) {
        return PLAYGROUND_VS_CURATED_MESSAGE;
    }

    return null;
}

module.exports.smartBotResponse = smartBotResponse;
