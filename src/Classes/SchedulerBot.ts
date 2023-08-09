import { Channel, Collection, EmbedBuilder, TextChannel } from 'discord.js'
import { ProjectConfig } from '../ProjectConfig/projectConfig'
import { artIndexerBot } from '..'
import { delay } from './APIBots/utils'
import { randomColor } from '../Utils/smartBotResponse'

const cron = require('node-cron')

// Time for birthday check (UTC) - 10am EST (also + and - 8 hours)
const BIRTHDAY_CHECK_TIME = new Date()
BIRTHDAY_CHECK_TIME.setHours(14)
BIRTHDAY_CHECK_TIME.setMinutes(0)
BIRTHDAY_CHECK_TIME.setSeconds(0)
BIRTHDAY_CHECK_TIME.setMilliseconds(0)

export class ScheduleBot {
  channels: Collection<string, Channel>
  projectConfig: ProjectConfig
  constructor(
    channels: Collection<string, Channel>,
    projectConfig: ProjectConfig
  ) {
    this.channels = channels
    this.projectConfig = projectConfig
    this.initialize()
  }

  async initialize() {
    await delay(8000) // Wait for bot to connect and channels to load
    console.log('Starting Scheduler')
    const channels = this.channels
    const projectConfig = this.projectConfig

    // Birthdays
    cron.schedule(
      '0 1,9,17 * * *',
      function () {
        console.log('Birthday Time!')
        artIndexerBot.checkBirthdays(channels, projectConfig)
      },
      null,
      true,
      'America/Chicago'
    )

    // Trivia

    const sendMarfaMessage = this.sendMarfaMessage
    // Marfa
    cron.schedule(
      '0 11 * * *',
      function () {
        sendMarfaMessage(
          channels?.get(projectConfig.chIdByName['block-talk']) as TextChannel
        )
      },
      null,
      true,
      'America/Chicago'
    )

    cron.schedule(
      '0 11 * * * 1', // Every Monday
      function () {
        sendMarfaMessage(
          channels?.get(projectConfig.chIdByName['marfa']) as TextChannel
        )
      },
      null,
      true,
      'America/Chicago'
    )

    // TODO: Trivia
  }

  sendMarfaMessage(channel: TextChannel) {
    console.log('Marfa Time!')
    const marfaTime = new Date()
    marfaTime.setMonth(8) // Indexed at 0 :facepalm:
    marfaTime.setDate(21)
    const now = new Date()
    const diff = marfaTime.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const emojis = [':cactus:', ':cowboy:', ':tada:', ':desert:']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const embed = new EmbedBuilder()
      .setTitle(`${emoji}  ${days} days until Marfa!  ${emoji}`)
      .setColor(randomColor())
    channel.send({ embeds: [embed] }).catch((err) => {
      console.log(`Error posting Marfa message`, err.message)
    })
  }
}

// async startBirthdayRoutine(
//   channels: Collection<string, Channel>,
//   projectConfig: any
// ) {

// }

// async startTriviaRoutine() {
//   setInterval(() => {
//     console.log("It's trivia time!")
//     let attempts = 0
//     while (attempts < 10) {
//       const keys = Object.keys(this.projects)
//       const projectKey = keys[Math.floor(Math.random() * keys.length)]
//       const projBot = this.projects[projectKey]
//       if (projBot && projBot.editionSize > 1 && projBot.projectActive) {
//         triviaBot.askTriviaQuestion(projBot)
//         return
//       }
//       attempts++
//     }
//   }, ONE_MINUTE_IN_MS)
// }
