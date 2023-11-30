import * as dotenv from 'dotenv'
dotenv.config()
import { Channel, Collection, TextChannel } from 'discord.js'
import { ProjectConfig } from '../ProjectConfig/projectConfig'
import { artIndexerBot, projectConfig } from '..'
import { delay } from './APIBots/utils'

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
    Cron(
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

    // TODO: Uncomment when trivia is ready
    // Cron('* * * * *', { timezone: 'America/Chicago', name: 'Trivia' }, () => {
    //   console.log('Trivia Time!')
    //   artIndexerBot.askRandomTriviaQuestion()
    // })

    let currProjectId = parseInt(process.env.SPAM_START_INDEX ?? '0')
    Cron(
      '* * * * *',
      { timezone: 'America/New_York', name: 'Bday Spam' },
      () => {
        if (currProjectId === -1) {
          console.log('Spamming disabled')
          return
        }
        console.log('Spam Time!')
        const now = new Date()
        const n = new Date(now.getTime() + 1000 * 60 * 60 * 25)
        const startDate = new Date('2023-12-01T17:00:00.000Z') // 12pm ET 12/1/23
        if (n > startDate) {
          // TODO: replace with now
          const currProject = artIndexerBot.tempFlagshipMapping[currProjectId]
          if (!currProject || currProject.editionSize === 0) {
            return
          }
          console.log(
            'Spamming! ' + currProject.projectName + ' ' + currProjectId
          )
          currProject.sendSpecialMessage(
            this.channels.get(
              projectConfig.chIdByName['block-talk']
            ) as TextChannel
          )
          currProjectId++
        }
      }
    )
  }
}
