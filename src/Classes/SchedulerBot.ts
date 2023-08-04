import { Channel, Collection } from 'discord.js'
import { ProjectConfig } from '../ProjectConfig/projectConfig'
import { artIndexerBot } from '..'

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

  initialize() {
    const channels = this.channels
    const projectConfig = this.projectConfig
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
    // TODO: Trivia and Marfa events
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
