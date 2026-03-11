import * as dotenv from 'dotenv'
dotenv.config()
import { Channel, Collection } from 'discord.js'
import { ProjectConfig } from '../ProjectConfig/projectConfig'
import { artIndexerBot } from '..'
import { delay } from './APIBots/utils'
import { logger } from '../logger'

import { Cron } from 'croner'

// Time to wait for bot to connect and channels to load
const INIT_DELAY = 8000
export class ScheduleBot {
  channels: Collection<string, Channel>
  projectConfig: ProjectConfig
  private cronJobs: Cron[] = []

  constructor(
    channels: Collection<string, Channel>,
    projectConfig: ProjectConfig
  ) {
    this.channels = channels
    this.projectConfig = projectConfig
    this.initialize()
  }

  async initialize() {
    try {
      await delay(INIT_DELAY)
      logger.info('Starting Scheduler')
      const bdayCron = Cron(
        '00 1,9,17 * * *',
        { timezone: 'America/Chicago', name: 'Bday' },
        () => {
          logger.info('Birthday Time')
          artIndexerBot.checkBirthdays(this.channels)
        }
      )
      this.cronJobs.push(bdayCron)

      const triviaCadence = parseInt(process.env.TRIVIA_CADENCE ?? '0')

      if (triviaCadence > 0) {
        const triviaCron = Cron(
          `0 */${triviaCadence} * * *`,
          { timezone: 'America/Chicago', name: 'Trivia' },
          async () => {
            const wait = Math.random() * 1000 * 60 * 60 * triviaCadence
            logger.info({ waitMins: wait / 60000 }, 'Waiting for trivia')
            await delay(wait)

            if (isTriviaBlackoutTime()) {
              logger.info('Skipping Trivia during blackout times')
              return
            }

            logger.info('Trivia Time')
            artIndexerBot.askRandomTriviaQuestion()
          }
        )
        this.cronJobs.push(triviaCron)
      }
    } catch (err) {
      logger.error({ err }, 'Error initializing ScheduleBot')
    }
  }

  /**
   * Cleanup method to stop all cron jobs
   */
  cleanup() {
    for (const job of this.cronJobs) {
      job.stop()
    }
    this.cronJobs = []
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
