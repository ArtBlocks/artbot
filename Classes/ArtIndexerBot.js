require('dotenv').config()
const deburr = require('lodash.deburr')
const Web3 = require('web3')
const ProjectBot = require('./ProjectBot').ProjectBot
const getArtBlocksProjects =
  require('../Utils/parseArtBlocksAPI').getArtBlocksProjects

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

// Refresh takes around one minute, so recommend setting this to 60 minutes
const METADATA_REFRESH_INTERVAL_MINUTES =
  process.env.METADATA_REFRESH_INTERVAL_MINUTES

class ArtIndexerBot {
  constructor(projectFetch = getArtBlocksProjects) {
    this.projectFetch = projectFetch
    this.projects = {}
    this.init()
  }

  /**
   * Initialize async aspects of the FactoryBot
   */
  async init() {
    await this.buildProjectBots()

    setInterval(async () => {
      await this.buildProjectBots()
    }, METADATA_REFRESH_INTERVAL_MINUTES * 60000)
  }

  async buildProjectBots() {
    try {
      const projects = await this.projectFetch()
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i]
        console.log(
          `Refreshing project cache for Project ${project.projectId} ${project.name}`
        )

        const newBot = new ProjectBot({
          projectNumber: project.projectId,
          coreContract: project.contract.id,
          editionSize: project.invocations,
          projectName: project.name,
        })
        const projectKey = this.toProjectKey(project.name)
        this.projects[projectKey] = newBot
      }
    } catch (err) {
      console.error(`Error while initializing ArtIndexerBots\n${err}`)
    }
  }

  async handleNumberMessage(msg) {
    const content = msg.content

    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      )
      return
    }

    let projectKey = this.toProjectKey(
      content.substr(content.indexOf(' ') + 1).replace('?details', '')
    )

    // if '#?' message, get random project
    // TODO: merge functionality with RandomBot
    if (projectKey === '#?') {
      const keys = Object.keys(this.projects)
      projectKey = keys[Math.floor(Math.random() * keys.length)]
    }

    console.log(`Searching for project ${projectKey}`)
    const projBot = this.projects[projectKey]
    if (projBot) {
      projBot.handleNumberMessage(msg)
    }
  }

  toProjectKey(projectName) {
    const projectKey = deburr(projectName)
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')

    // just in case there's a project name with no alphanumerical characters
    if (projectKey === '') {
      return deburr(projectName).toLowerCase().replace(/\s+/g, '')
    }

    return projectKey
  }
}

module.exports.ArtIndexerBot = ArtIndexerBot
