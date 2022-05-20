const fetch = require('node-fetch')
const projectConfig = require('../ProjectConfig/projectConfig').projectConfig

// Trade activity Discord channel IDs.
const CHANNEL_SALES_CHAT = projectConfig.chIdByName['block-talk']
const CHANNEL_SALES = projectConfig.chIdByName['sales-feed']
const CHANNEL_LISTINGS = projectConfig.chIdByName['listing-feed']
const CHANNEL_SQUIGGLE_SALES = projectConfig.chIdByName['squiggle_square']
const CHANNEL_SQUIGGLE_LISTINGS = projectConfig.chIdByName['squiggle-listings']
const CHANNEL_FIDENZA_AND_IC_SALES =
  projectConfig.chIdByName['fidenza-and-ic-sales']

// Addresses which should be omitted entirely from event feeds.
const BAN_ADDRESSES = new Set([
  '0x8cf11506812f224af5c01c5f9dce5431ec3d60fd',
  '0x2897a0ad0032df254c74e9f17e76b474eec8ed38',
  '0xc7f45f209a925f9ae6af2043cf44e6570be5b21c',
  '0x9b397d50f662d5d39e88e4b886571581ccf48188',
  '0xe1770cf5274084db23bca6c921fa51cf62a37eda',
  '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270',
  '0x7b77ebc4bab939071543243a4909ca4c51c9c1fd',
  '0x45d91f318b2abc6b569b6637c84cdb66486eb9ee',
  '0x435de9e65aae5c1324d5c2359f23db32e882512c',
  '0x3c3fb7e51d8cfcc9451100dddf59255c6d7fc5c2',
  '0x7058634bc1394af83aa0a3589d6b818e4c35295a',
  '0x8491fc2625aeece9abc897ef29544e825a72d66e',
  '0xbcba11ef0dc585f028d8f4442e82ee6ceecbcbba',
  '0x33d27f0bb797de3d20e519f4a192b7570c56681b',
  '0xed30fdda2d9c605ee9c519581d65de65fb58daed',
  '0x9048d24577d4c4bbf14f1020f20640b334f8c762',
  '0x3c6137504c38215fea30605b3e364a23c1d3e14f',
  '0xbd67097f6ef72f5337cb4932391e04d2d07e1a61',
  '0xb1e6f68aa3ab791f2e835d84a9c1c2b054aa3598',
  '0x2ad7d5ac35319d221b2d1c7ee9edb2e3d106962e',
  '0x438681aa97bf5ecf1fe9110d1b04ed8230e2bfad',
  '0x7342948869d97e6fe1bcf8d717a9024a43225654',
  '0xa7a61f59ed97a8ccd4c9f4cb28c382b72b2446f8',
  '0xcaa6cbff376018a5e38238d6166b6b4f2ecf49c9',
  '0x7eea64bd72fdbc1d78c908be7f70f1daeb249951',
  '0x39b99f561eac03e150eca45254d0bc0b9e0404fb',
  '0x39b99f561eac03e150eca45254d0bc0b9e0404fb',
  '0xde52ed2a4ac7aa814ae3fda95d32aa419f45200d',
  '0x5a3a9d7c2f2d2fb9dfae78fda79134ba6d706352',
  '0x52238ce4a874356cc64e2eaf67d7265b53b427b1',
  '0xc4a66617ba07758f6f23efa1b90aba46ed4c4729',
  '0xd523c78cdc2ddbaafa0db1a3f4b35baf799501ff',
  '0x907df6e3ef654854520bb7c71f8b6c2f14ca3a87',
  '0x9fde734f42920221db35fe7e2405c8a68b7539df',
  '0x406dd0831439abb26c51de18baa031dbb267cb7e',
  '0x5a3a9d7c2f2d2fb9dfae78fda79134ba6d706352',
  '0xcd969f0eb423c2e6eb486da3268c048e04963c12',
  '0xb08a13cbc99c9631b7b2593e22ec803af23fe97d',
  '0x9aaacea197b3315068b8ef9c98219382b168d4b8',
  '0x72c0877d82f4fbc7ab7da21077ef152107ccd471',
  '0x120e30953b191998e13d670be4a6f3a7f181a060',
  '0xff789ac0443b50d184232ce90479ab75d9e3602f',
  '0xf2c447108e057ae6d2d1855bcde61cbfc15ec3fd',
  '0x9c7769a6dc4202b779e4d4da57737d76d13dec0f',
  '0x15737b0699e11fd34dffbdb05255e5c852f56fad',
  '0x1de3b4839d3767335435387e7b468346ae152885',
  '0xbe59cb2cdaba0034b98f15decbb4b500811e0020',
  '0xf4510444931bf5fd1666700597c18941e8465019',
  '0xe0f0abd8e2d15a67f242fa9aa43620cee9b354eb',
  '0x68fc3ec2f29ba49e2a79df34cdaa3c127a207097',
  '0x7de871f520228b7a9b9fe2c718766f07a261c56c',
  '0x7c97af86a0f92beceb712417fa0856188bb6b337',
  '0xd5a5d0b4566322173b1aea3a669b684129edfc8a',
  '0x7b77ebc4bab939071543243a4909ca4c51c9c1fd',
  '0x4ef4e75c6b27b6a3f1d8a331894392692633284d',
  '0x0f87d3a46cc9bd339b28020f737e37e0ddd728bf',
  '0xe1770cf5274084db23bca6c921fa51cf62a37eda',
  '0xc7f45f209a925f9ae6af2043cf44e6570be5b21c',
  '0x592a6119e24013e4e7d02259e1c9b7148fec7677',
  '0xaee378ba81e5ccba714c3c455a93abddd956f533',
  '0xf95323e393b776acc2f9e1de83be1094f22ca703',
  '0x706b5d16ad3027b9120ac270f66992079aacd8b2',
  '0x8d4be76c4113046d9d7ac34a11adecea91b977cd',
  '0x489f2dec2c7482faeae99d851aeda13625ea35ff',
  '0x3656d9a9ced1909981bc3d6feb7b54b9dbd25173',
  '0x872ea485576a569b06861a94946f04c08c510358',
  '0x592a6119e24013e4e7d02259e1c9b7148fec7677',
  '0x9b397d50f662d5d39e88e4b886571581ccf48188',
])

async function triageActivityMessage(msg, bot) {
  // Iterate through entire array of embeds, though there should only
  // ever be one at a time per message.
  const embeds = msg.embeds
  for (i = 0; i < embeds.length; i++) {
    const embed = embeds[i]

    if (embed.author == null) {
      return
    }

    // Determine the item that the event is associated with.
    const openseaURL = embed.author.url
    const urlComponents = openseaURL.split('/')
    const tokenID = urlComponents[urlComponents.length - 1]

    // Extract out the "author name".
    const authorName = embed.author.name
    const eventName = authorName.split(':')[0]

    // Get current description.
    let description = embed.description
    const re = /.*Owner\:\*\*\s+(.*)\s+\(.*/
    const owner = description.match(re)[0].split(' ')[2].trim()

    // Return early if description includes bot-banned user.
    if (BAN_ADDRESSES.has(owner)) {
      console.log(`Skipping message propagation for ${owner}`)
      return
    }

    // Return early if event is a referral.
    let priceField
    for (let i = embed.fields.length - 1; i >= 0; i--) {
      const embedField = embed.fields[i]
      if (embedField.name.includes('Referral Reward')) {
        console.log(`Skipping message propagation for referral.`)
        return
      }
      if (
        embedField.name.includes('Fixed Price') ||
        embedField.name.includes('SOLD for')
      ) {
        priceField = embedField
      }
    }
    embed.fields = [priceField]

    // Split off the "Description" text within the description.
    const descriptionDescriptionIndex =
      description.indexOf('\n**Description:**')
    description = description.substring(0, descriptionDescriptionIndex + 1)

    // Assuming that "Name" is the first field, remove it.
    const nameLineBreakIndex = description.indexOf('\n')
    const lastIndex = description.length - 1
    description = description.substring(nameLineBreakIndex, lastIndex)

    // Remove (ethereum) from names
    description = description.replace(/\(identifier: ethereum\)/g, '')

    // Replace "Owner" with "Seller"
    description = description.replace(/Owner/, 'Seller')

    // Replace "Winner" with "Buyer"
    description = description.replace(/Winner/g, 'Buyer')

    // Update description with parsed and modified string.
    embed.setDescription(description.trim())

    // Get Art Blocks metadata response for the item.
    const artBlocksResponse = await fetch(
      `https://token.artblocks.io/${tokenID}`
    )
    const artBlocksData = await artBlocksResponse.json()

    // Update thumbnail image to use larger variant from Art Blocks API.
    embed.setThumbnail(artBlocksData.image)

    // Add inline field for viewing live script on Art Blocks.
    embed.addField(
      'Live Script',
      `[view on artblocks.io](${artBlocksData.external_url})`,
      true
    )

    // Update to remove author name and to reflect this info in piece name
    // rather than token number as the title and URL field..
    embed.author = null
    embed.setTitle(`${artBlocksData.name} - ${artBlocksData.artist}`)
    embed.setURL(openseaURL)

    // Only forward sales events and listing events.
    if (artBlocksData.collection_name) {
      if (eventName.includes('Successful')) {
        sendEmbedToSaleChannels(bot, embed, artBlocksData)
      } else if (eventName.includes('Created')) {
        sendEmbedToListChannels(bot, embed, artBlocksData)
      }
    }
  }
}

/**
 * Helper function to send embed message to all proper sales channels
 * @param {*} bot
 * @param {*} embed
 * @param {*} artBlocksData
 */
function sendEmbedToSaleChannels(bot, embed, artBlocksData) {
  bot.channels.cache.get(CHANNEL_SALES).send(embed)
  bot.channels.cache.get(CHANNEL_SALES_CHAT).send(embed)
  // Forward all Chromie Squiggles sales on to the DAO.
  if (artBlocksData.collection_name.includes('Chromie Squiggle')) {
    bot.channels.cache.get(CHANNEL_SQUIGGLE_SALES).send(embed)
  }
  if (artBlocksData.collection_name.includes('Fidenza')) {
    bot.channels.cache.get(CHANNEL_FIDENZA_AND_IC_SALES).send(embed)
  }
  if (artBlocksData.collection_name.includes('Incomplete Control')) {
    bot.channels.cache.get(CHANNEL_FIDENZA_AND_IC_SALES).send(embed)
  }
}

/**
 * Helper function to send embed message to all proper listing channels
 * @param {*} bot
 * @param {*} embed
 * @param {*} artBlocksData
 */
function sendEmbedToListChannels(bot, embed, artBlocksData) {
  bot.channels.cache.get(CHANNEL_LISTINGS).send(embed)
  // Forward all Chromie Squiggles listings on to the DAO.
  if (artBlocksData.collection_name.includes('Chromie Squiggle')) {
    bot.channels.cache.get(CHANNEL_SQUIGGLE_LISTINGS).send(embed)
  }
  if (artBlocksData.collection_name.includes('Fidenza')) {
    bot.channels.cache.get(CHANNEL_FIDENZA_AND_IC_SALES).send(embed)
  }
  if (artBlocksData.collection_name.includes('Incomplete Control')) {
    bot.channels.cache.get(CHANNEL_FIDENZA_AND_IC_SALES).send(embed)
  }
}

module.exports.triageActivityMessage = triageActivityMessage
module.exports.sendEmbedToListChannels = sendEmbedToListChannels
module.exports.sendEmbedToSaleChannels = sendEmbedToSaleChannels
module.exports.BAN_ADDRESSES = BAN_ADDRESSES
