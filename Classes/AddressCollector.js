require('dotenv').config()
const { MessageEmbed } = require('discord.js')
const { google } = require('googleapis')
const fetch = require('node-fetch')
const fs = require('fs')
const Web3 = require('web3')

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

// Discord address book to use.
const DISCORD_ADDRESSBOOK = '411959613370400778'

// Google sheet API details.
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID
const GOOGLE_AUTH_DETAILS = process.env.GOOGLE_AUTH_DETAILS

// ArtBot details.
const ARTBOT_USERNAME = 'artbot'
const ARTBOT_RED = 0xff0000
const ARTBOT_GREEN = 0x00ff00

// Google Sheets API posting.
const parsedCredentials = JSON.parse(GOOGLE_AUTH_DETAILS)
const jwtClient = new google.auth.JWT({
  email: parsedCredentials.client_email,
  key: parsedCredentials.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})
const sheetsService = google.sheets('v4')

// A message for when invalid wallet address is entered.
const INVALID_ADDRESS_MESSAGE = `**Invalid Wallet Address:** Your address was not recorded due to malformed input. Your wallet address should be a 20-byte string, starting with "0x"`

// A message for when address not recorded due to lack of VIP list membership.
const NON_ALLOWLIST_MESSAGE = `**Not An Early Member:** Your address was not recorded due to not having joined the Discord prior end of February 2021.`

// Failed to connect.
const FAILED_TO_CONNECT_MESSAGE = `**Failure:** Could not record address due to a connection issue, please try again later.`

// A message for when address is recorded as expected.
const ADDRESS_RECORDED_MESSAGE = `**Success:** Your address has been recorded. Thank you!`

class AddressCollector {
  constructor() {
    // Create Discord lookup list.
    //
    // Note: This algorithm has a lookup complexity of O(n), which is not as
    // ideal as the O(1) approach of using a hashmap (with a similar initial
    // parsing cost).
    //
    // However, the added complexity of implementing this as a hashmap is
    // likely not worth the added complexity if the the total number of
    // Discord lookup members is on the order of thousands.
    this.discordLookup = fs
      .readFileSync(`./Classes/${DISCORD_ADDRESSBOOK}.csv`)
      .toString() // Convert file buffer to string.
      .split('\n') // Split into array based on newlines.
      .map((line) => line.trim()) // Remove any extra whitespace.
  }

  // Handles a message for the address aggregation channel.
  // If the address is valid and the sender is part of the VIP list, record the
  // address in the VIP list set.
  // Otherwise, respond to the user notifying them of the failure to record their
  // address. (TODO: Do we always tell the user the cause of the failure?)
  async addressCollectionHandler(msg) {
    const msgAuthorUsername = msg.author.username
    const msgAuthorID = msg.author.id
    const msgContent = msg.content

    // NOTE: It is important to check if the message author is the ArtBot
    //       itself to avoid a recursive infinite loop.
    if (msgAuthorUsername == ARTBOT_USERNAME) {
      return
    }

    // Check if message is a valid wallet address and return early otherwise.
    if (!web3.utils.isAddress(msgContent)) {
      msg.reply(INVALID_ADDRESS_MESSAGE)
      return
    }

    // Check if message sender is part of the Discord member list or not.
    if (!this.discordLookup.includes(msgAuthorID)) {
      console.log(msgAuthorID)
      msg.reply(NON_ALLOWLIST_MESSAGE)
      return
    }

    // Authenticate request to Google Sheets API.
    jwtClient.authorize(function (error, tokens) {
      if (error) {
        console.log(error)
        msg.reply(FAILED_TO_CONNECT_MESSAGE)
        return
      } else {
        console.log('Successfully connected!')

        // Adds address to address collection Google sheet.
        sheetsService.spreadsheets.values.append(
          {
            auth: jwtClient,
            spreadsheetId: GOOGLE_SHEET_ID,
            range: 'Addresses!A1',
            valueInputOption: 'RAW',
            resource: {
              values: [[msgContent, msgAuthorID, Date.now()]],
            },
          },
          (error, result) => {
            if (error) {
              console.log(error)
              msg.reply(FAILED_TO_CONNECT_MESSAGE)
              return
            } else {
              console.log(`Successfully added: ${msgContent}`)
              msg.reply(ADDRESS_RECORDED_MESSAGE)
              return
            }
          }
        )
      }
    })
  }
}

module.exports.AddressCollector = AddressCollector
