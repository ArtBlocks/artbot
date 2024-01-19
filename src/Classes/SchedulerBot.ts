import * as dotenv from 'dotenv'
dotenv.config()
import { Channel, Collection } from 'discord.js'
import { ProjectConfig } from '../ProjectConfig/projectConfig'
import { artIndexerBot } from '..'
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

    const triviaCadence = parseInt(process.env.TRIVIA_CADENCE ?? '0')

    if (triviaCadence > 0) {
      Cron(
        `0 */${triviaCadence} * * *`,
        { timezone: 'America/Chicago', name: 'Trivia' },
        async () => {
          const wait = Math.random() * 1000 * 60 * 60 * triviaCadence
          console.log(`Waiting ${wait / 60000} mins for trivia`)
          await delay(wait)

          if (isTriviaBlackoutTime()) {
            console.log('Skipping Trivia during blackout times :(')
            return
          }

          console.log('Trivia Time!')
          artIndexerBot.askRandomTriviaQuestion()
        }
      )
    }
  }
}

// Don't want to send trivia messages while flagship releases are happening
// Current blackout times are: Monday 11-2pm CT, Wednesday 11-5pm CT
const isTriviaBlackoutTime = () => {
  const now = new Date()
  const weekday = now.toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long',
  })
  const hourText = now.toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    hour12: false,
  })
  const hour = parseInt(hourText)

  return (
    (weekday.includes('Monday') && hour > 11 && hour < 14) ||
    (weekday.includes('Wednesday') && hour > 11 && hour < 17)
  )
}
