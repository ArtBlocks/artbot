import { Channel, Collection, EmbedBuilder, TextChannel } from 'discord.js'
import { ProjectConfig } from '../ProjectConfig/projectConfig'
import { artIndexerBot } from '..'
import { delay } from './APIBots/utils'
import { randomColor } from '../Utils/smartBotResponse'

const cron = require('node-cron')
// Time to wait for bot to connect and channels to load
const INIT_DELAY = 8000
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
    await delay(INIT_DELAY)
    console.log('Starting Scheduler...')
    const channels = this.channels
    const projectConfig = this.projectConfig

    // Birthdays
    cron.schedule(
      '0 1,9,17 * * *', // Every day at 1am, 9am, and 5pm CT
      function () {
        console.log('Birthday Time!')
        artIndexerBot.checkBirthdays(channels, projectConfig)
      },
      null,
      true,
      'America/Chicago'
    )

    // Marfa
    const sendMarfaMessage = this.sendMarfaMessage
    cron.schedule(
      '0 11 * * *', // Every day at 11am CT
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
      '0 11 * * * 1', // Every Monday at 11am CT
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
