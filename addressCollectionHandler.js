require("dotenv").config();
const {
  MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");
const Web3 = require("web3");

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// ArtBot details..
const ARTBOT_USERNAME = "artbot";
const ARTBOT_RED = 0xff0000;
const ARTBOT_GREEN = 0x00ff00;

// A message for when invalid wallet address is entered.
const INVALID_ADDRESS_MESSAGE = `**Invalid Wallet Address:** Your address was not recorded due to malformed input. Your wallet address should be a 20-byte string, starting with "0x"`;

// A message for when address not recorded due to lack of allowlist membership.
const NON_ALLOWLIST_MESSAGE = `**Discord User Not Allowlisted:** Your address was not recorded due to now belonging in the Discord at time of allowlist creation.`;

// A message for when address is recorded as expected.
const ADDRESS_RECORDED_MESSAGE = `**Success:** Your address has been recorded. Thank you!`;

// Handles a message for the address aggregation channel.
// If the address is valid and the sender is part of the allowlist, record the
// address in the allowlist set.
// Otherwise, respond to the user notifying them of the failure to record their
// address. (TODO: Do we always tell the user the cause of the failure?)
async function addressCollectionHandler(msg) {
  let msgAuthor = msg.author.username;
  let msgContent = msg.content;

  // NOTE: It is important to check if the message author is the ArtBot
  //       itself to avoid a recursive infinite loop.
  if (msgAuthor == ARTBOT_USERNAME) {
    return;
  }

  // Check if message is a valid wallet address and return early otherwise.
  if (!web3.utils.isAddress(msgContent)) {
    msg.reply(INVALID_ADDRESS_MESSAGE);
    return;
  }

  // TODO: record.
  console.log(msgContent);
  msg.reply(ADDRESS_RECORDED_MESSAGE);

  // TODO: add fall-back message
}

module.exports.addressCollectionHandler = addressCollectionHandler;
