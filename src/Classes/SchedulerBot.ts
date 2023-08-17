import { Channel, Collection, EmbedBuilder, TextChannel } from 'discord.js'
import { ProjectConfig } from '../ProjectConfig/projectConfig'
import { artIndexerBot } from '..'
import { delay } from './APIBots/utils'
import { randomColor } from '../Utils/smartBotResponse'

import { Cron } from 'croner'

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
    const bdayJob = Cron(
      '00 1,9,17 * * *',
      { timezone: 'America/Chicago', name: 'Bday' },
      () => {
        console.log('Birthday Time!')
        const now = new Date()
        const hour = now.toLocaleString('en-US', {
          timeZone: 'America/Chicago',
          hour: 'numeric',
        })
        artIndexerBot.checkBirthdays(
          this.channels,
          this.projectConfig,
          hour.includes('9') // Only post in artist channels at 9am runtime
        )
      }
    )

    // Marfa

    const btMarfaJob = Cron(
      '00 11 * * *',
      { timezone: 'America/Chicago', name: 'Block Talk Marfa' },
      () => {
        console.log('Block Talk Marfa Time!')
        this.sendMarfaMessage(
          this.channels?.get(
            this.projectConfig.chIdByName['block-talk']
          ) as TextChannel
        )
      }
    )

    const marfaMarfaJob = Cron(
      '00 11 * * 1',
      { timezone: 'America/Chicago', name: 'Marfa Marfa' },
      () => {
        console.log('Marfa Marfa Time!')
        this.sendMarfaMessage(
          this.channels?.get(
            this.projectConfig.chIdByName['marfa']
          ) as TextChannel
        )
      }
    )

    // Temporary logging for debugging!
    setInterval(async () => {
      const a = bdayJob.nextRun()
      const b = btMarfaJob.nextRun()
      const c = marfaMarfaJob.nextRun()
      console.log(
        `Current Time: ${new Date().toISOString()}\n`,
        `Next runs: Bday: ${a?.toISOString()}, BT: ${b?.toISOString()}, Marfa: ${c?.toISOString()}`
      )
    }, 60 * 60000) // Every hour
    // TODO: Trivia
  }

  sendMarfaMessage(channel: TextChannel) {
    const marfaTime = new Date()
    marfaTime.setMonth(8) // Indexed at 0 :facepalm:
    marfaTime.setDate(21)
    const now = new Date()
    const diff = marfaTime.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const emojis = [':cactus:', ':cowboy:', ':tada:', ':desert:']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const marfaLink =
      'https://www.artblocks.io/info/spectrum/third-annual-open-house-weekend'
    const embed = new EmbedBuilder()
      .setTitle(`${emoji}  ${days} days until Marfa!  ${emoji}`)
      .setDescription(`[Click here for more info!](${marfaLink})`)
      .setColor(randomColor())
    channel.send({ embeds: [embed] }).catch((err) => {
      console.log(`Error posting Marfa message`, err.message)
    })
  }
}
