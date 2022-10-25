const { MessageEmbed } = require('discord.js')

const ms = require('ms') // Npm install ms

async function handleGiveawayStart(msg, bot, args) {
  // Giveaway duration
  const giveawayDuration = args[0]
  // If the duration isn't valid
  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return msg.channel.send(':x: You have to specify a valid duration!')
  }

  // Number of winners
  const giveawayNumberWinners = args[1]
  // If the specified number of winners is not a number
  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return msg.channel.send(
      ':x: You have to specify a valid number of winners!'
    )
  }

  // Giveaway prize
  const giveawayPrize = args.slice(2).join(' ')
  // If no prize is specified
  if (!giveawayPrize) {
    return msg.channel.send(':x: You have to specify a valid prize!')
  }

  bot.giveawaysManager
    .start(msg.channel, {
      time: ms(giveawayDuration),
      winnerCount: parseInt(giveawayNumberWinners),
      prize: giveawayPrize,
      messages: {
        giveaway: '\n🎉🎉 **GIVEAWAY** 🎉🎉',
        giveawayEnded: '\n🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
        embedFooter: '',
      },
    })
    .then((gData) => {
      console.log(gData) // {...} (messageID, end date and more)
    })
  // And the giveaway has started!
}

function findGiveaway(bot, args) {
  const result =
    // Search with giveaway prize
    bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0])

  return result
}

async function handleGiveawayEnd(msg, bot, args) {
  // If no message ID or giveaway name is specified
  if (!args[0]) {
    return msg.channel.send(':x: You have to specify a valid message ID!')
  }

  // Find the specified giveaway
  const giveaway = findGiveaway(bot, args)
  if (!giveaway) {
    return msg.channel.send(
      `Unable to find a giveaway for \`${args.join(' ')}\`.`
    )
  }

  // Edit the giveaway
  bot.giveawaysManager
    .edit(giveaway.messageID, {
      setEndTimestamp: Date.now(),
    })

    // Success message
    .then(() => {
      // Success message
      msg.channel.send(
        `Giveaway will end in less than ${
          bot.giveawaysManager.options.updateCountdownEvery / 1000
        } seconds...`
      )
    })
    .catch((error) => {
      if (
        error
          .toString()
          .startsWith(
            `Giveaway with message ID ${giveaway.messageID} is already ended.`
          )
      ) {
        msg.channel.send('This giveaway is already ended!')
      } else {
        console.error(error)
        msg.channel.send('An error occured...')
      }
    })
}

async function handleGiveawayReroll(msg, bot, args) {
  // If no message ID or giveaway name is specified
  if (!args[0]) {
    return msg.channel.send(':x: You have to specify a valid message ID!')
  }

  // Try to find the giveaway with prize then with ID
  const giveaway = findGiveaway(bot, args)
  if (!giveaway) {
    return msg.channel.send(
      `Unable to find a giveaway for \`${args.join(' ')}\`.`
    )
  }

  // Reroll the giveaway
  bot.giveawaysManager
    .reroll(giveaway.messageID)
    .then(() => {
      // Success message
      msg.channel.send('Giveaway rerolled!')
    })
    .catch((error) => {
      if (
        error.startsWith(
          `Giveaway with message ID ${giveaway.messageID} is not ended.`
        )
      ) {
        msg.channel.send('This giveaway is not ended!')
      } else {
        console.error(error)
        msg.channel.send('An error occured...')
      }
    })
}

async function handleGiveawayMessage(msg, bot) {
  const args = msg.content.slice('giveaway!'.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  /*
   * Giveaway!start 2d 1 Awesome prize!
   * Will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
   */

  // If this is a valid command, and the member doesn't have enough permissions, return an error
  if (command === 'start' || command === 'reroll' || command === 'end') {
    if (
      !msg.member.hasPermission('MANAGE_MESSAGES') &&
      !msg.member.roles.cache.some(
        (r) => r.name.toLowerCase() === 'giveaway master'
      )
    ) {
      return msg.channel.send(
        ':x: You need to have the right permissions to start giveaways.'
      )
    }
  }

  if (command === 'start') {
    return handleGiveawayStart(msg, bot, args)
  } else if (command === 'end') {
    return handleGiveawayEnd(msg, bot, args)
  } else if (command === 'reroll') {
    return handleGiveawayReroll(msg, bot, args)
  } else if (command === 'help') {
    return msg.channel.send(
      'Giveaway Usage:  giveaway![start|end|reroll] <time> <winner_count> <prize>'
    )
  }
}

module.exports.handleGiveawayMessage = handleGiveawayMessage
