/* eslint-disable no-case-declarations */
import { Channel, Collection, Message } from 'discord.js'
import * as dotenv from 'dotenv'

import { ProjectBot } from './ProjectBot'
import {
  getAllProjects,
  getArtblocksOpenProjects,
  getAllTokensInWallet,
} from '../Data/queryGraphQL'
import { triviaBot } from '..'
import {
  Categories_Enum,
  ProjectDetailFragment,
  TokenDetailFragment,
} from '../Data/generated/graphql'
import {
  getVerticalName,
  isVerticalName,
  resolveEnsName,
} from './APIBots/utils'
dotenv.config()

const deburr = require('lodash.deburr')

const PROJECT_ALIASES = require('../ProjectConfig/project_aliases.json')
const { isWallet } = require('./APIBots/utils')

// Refresh takes around one minute, so recommend setting this to 60 minutes
const METADATA_REFRESH_INTERVAL_MINUTES =
  process.env.METADATA_REFRESH_INTERVAL_MINUTES ?? '60'

// Time for random art (UTC) - 8am EST
const RANDOM_ART_TIME = new Date()
RANDOM_ART_TIME.setHours(12)
RANDOM_ART_TIME.setMinutes(0)
RANDOM_ART_TIME.setSeconds(0)
RANDOM_ART_TIME.setMilliseconds(0)

// Time for birthday check (UTC) - 10am EST (also + and - 8 hours)
const BIRTHDAY_CHECK_TIME = new Date()
BIRTHDAY_CHECK_TIME.setHours(14)
BIRTHDAY_CHECK_TIME.setMinutes(0)
BIRTHDAY_CHECK_TIME.setSeconds(0)
BIRTHDAY_CHECK_TIME.setMilliseconds(0)

const ONE_MINUTE_IN_MS = 60000

export enum MessageTypes {
  RANDOM = 'random',
  ARTIST = 'artist',
  COLLECTION = 'collection',
  TAG = 'tag',
  PROJECT = 'project',
  OPEN = 'open',
  WALLET = 'wallet',
  UNKNOWN = 'unknown',
}

type ProjectBotAndToken = {
  projectBot: ProjectBot
  tokenId: string
}

export class ArtIndexerBot {
  projectFetch: () => Promise<ProjectDetailFragment[]>
  projects: { [id: string]: ProjectBot }
  artists: { [id: string]: ProjectBot[] }
  birthdays: { [id: string]: ProjectBot[] }
  collections: { [id: string]: ProjectBot[] }
  tags: { [id: string]: ProjectBot[] }
  sentBirthdays: { [id: string]: boolean }
  walletTokens: { [id: string]: TokenDetailFragment[] }

  constructor(projectFetch = getAllProjects) {
    this.projectFetch = projectFetch
    this.projects = {}
    this.artists = {}
    this.birthdays = {}
    this.collections = {}
    this.tags = {}
    this.sentBirthdays = {}
    this.walletTokens = {}
    this.init()
  }

  /**
   * Initialize async aspects of the FactoryBot
   */
  async init() {
    await this.buildProjectBots()

    setInterval(async () => {
      await this.buildProjectBots()
    }, parseInt(METADATA_REFRESH_INTERVAL_MINUTES) * ONE_MINUTE_IN_MS)
  }

  async buildProjectBots() {
    try {
      const projects = await this.projectFetch()
      console.log(
        `ArtIndexerBot: Building ${projects.length} ProjectBots using: ${this.projectFetch.name}`
      )
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i]
        if (project.invocations === '0') continue
        let bday = project.start_datetime
        // Only AB projects use vertical names. Other projects (Engine, Collabs, etc) should use the category name
        const collection = this.toProjectKey(
          project.vertical?.category_name?.toLowerCase() !==
            Categories_Enum.Collections
            ? project.vertical?.category_name
            : project.vertical_name
        )
        const tags: string[] = project.tags.map((tag) =>
          this.toProjectKey(tag.tag_name)
        )
        const newBot = new ProjectBot({
          id: project.id,
          projectNumber: parseInt(project.project_id),
          coreContract: project.contract_address,
          editionSize: project.invocations,
          maxEditionSize: project.max_invocations,
          projectName: project.name ?? 'unknown',
          description: project.description ?? '',
          projectActive: project.active,
          namedMappings: undefined,
          artistName: project.artist_name ?? 'unknown artist',
          collection,
          tags,
          startTime: bday ? new Date(bday) : undefined,
        })

        const projectKey = this.toProjectKey(project.name ?? 'unknown project')
        this.projects[projectKey] = newBot

        if (bday) {
          const [, month, day] = bday.split('T')[0].split('-')
          bday = month + '-' + day
          this.birthdays[bday] = this.birthdays[bday] ?? []
          this.birthdays[bday].push(newBot)
        }
        const artistName = this.toProjectKey(
          project.artist_name ?? 'unknown artist'
        )
        this.artists[artistName] = this.artists[artistName] ?? []
        this.artists[artistName].push(newBot)

        this.collections[collection] = this.collections[collection] ?? []
        this.collections[collection].push(newBot)
        for (let j = 0; j < tags.length; j++) {
          const tag = tags[j]
          this.tags[tag] = this.tags[tag] ?? []
          this.tags[tag].push(newBot)
        }
      }
    } catch (err) {
      console.error(`Error while initializing ArtIndexerBots\n${err}`)
    }
  }

  // Please update HASHTAG_MESSAGE in smartBotResponse.ts if you add more options here
  getMessageType(key: string, afterTheHash: string): MessageTypes {
    if (key === '#?') {
      return MessageTypes.RANDOM
    } else if (key === 'open') {
      return MessageTypes.OPEN
    } else if (isVerticalName(key)) {
      return MessageTypes.COLLECTION
    } else if (this.tags[key]) {
      return MessageTypes.TAG
    } else if (this.artists[key]) {
      return MessageTypes.ARTIST
    } else if (isWallet(afterTheHash?.split(' ')[0])) {
      return MessageTypes.WALLET
    } else if (this.projects[key]) {
      return MessageTypes.PROJECT
    }
    return MessageTypes.UNKNOWN
  }

  async projectBotForMessage(
    key: string,
    afterTheHash: string
  ): Promise<ProjectBot | undefined> {
    const messageType = this.getMessageType(key, afterTheHash)
    switch (messageType) {
      case MessageTypes.RANDOM:
        return this.getRandomizedProjectBot(Object.values(this.projects))
      case MessageTypes.OPEN:
        return await this.getRandomOpenProjectBot()
      case MessageTypes.COLLECTION:
        return this.getRandomizedProjectBot(
          this.collections[getVerticalName(key)]
        )
      case MessageTypes.TAG:
        return this.getRandomizedProjectBot(this.tags[key])
      case MessageTypes.ARTIST:
        return this.getRandomizedProjectBot(this.artists[key])
      case MessageTypes.PROJECT:
        return this.projects[key]
      case MessageTypes.WALLET:
      case MessageTypes.UNKNOWN:
        return undefined
    }
  }

  async handleNumberMessage(msg: Message) {
    const content = msg.content
    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      )
      return
    }

    let afterTheHash = content
      .substr(content.indexOf(' ') + 1)
      .replace('?details', '')

    let projectKey = this.toProjectKey(afterTheHash)

    const messageType = this.getMessageType(projectKey, afterTheHash)

    let projectBot
    // Wallet has to be handled separately as it is dealing with specific tokens not whole projects
    if (messageType === MessageTypes.WALLET) {
      const wallet = afterTheHash.split(' ')[0]
      afterTheHash = afterTheHash.replace(wallet, '')
      projectKey = this.toProjectKey(afterTheHash)
      projectKey = projectKey === '' ? '#?' : projectKey
      if (
        this.getMessageType(projectKey, afterTheHash) === MessageTypes.UNKNOWN
      ) {
        msg.channel.send(
          `Sorry, I wasn't able to understand that: ${afterTheHash}`
        )
        return
      }
      let token
      try {
        token = await this.getRandomWalletToken(wallet, projectKey)
      } catch (err) {
        msg.channel.send(err.message)
        return
      }
      msg.content = `#${token?.invocation}`
      projectBot = this.projects[this.toProjectKey(token.project.name ?? '')]
    } else {
      projectBot = await this.projectBotForMessage(projectKey, afterTheHash)
    }

    if (!projectBot) {
      console.log("Wasn't able to parse message", content)
      return
    }
    projectBot.handleNumberMessage(msg)
  }

  async handleNumberTweet(tweet: string): Promise<ProjectBotAndToken> {
    let content = tweet
    let afterTheHash = content.replace(/#(\?|\d+)/g, '').trim()
    let key = this.toProjectKey(afterTheHash)
    key = content === '#?' ? '#?' : key

    const messageType = this.getMessageType(key, afterTheHash)
    let projectBot
    if (messageType === MessageTypes.WALLET) {
      const walletMatch = afterTheHash.match(
        /(0x[a-fA-F0-9]{40})|([a-zA-Z0-9.-]+\.eth)/g
      )
      if (!walletMatch) {
        throw new Error(`Wasn't able to parse wallet from tweet ${content}`)
      }
      const wallet = walletMatch[0]

      afterTheHash = afterTheHash.replace(wallet, '')
      key = this.toProjectKey(afterTheHash)
      key = key === '' ? '#?' : key
      if (this.getMessageType(key, afterTheHash) === MessageTypes.UNKNOWN) {
        throw new Error(`Invalid wallet tweet: ${afterTheHash}`)
      }
      const token = await this.getRandomWalletToken(wallet, key)

      content = `#${token?.invocation}`
      projectBot = this.projects[this.toProjectKey(token.project.name ?? '')]
    } else {
      projectBot = await this.projectBotForMessage(key, afterTheHash)
    }

    if (!projectBot) {
      throw new Error(`Wasn't able to parse tweet ${content}`)
    }

    const tokenId = await projectBot.handleTweet(content)

    return { projectBot, tokenId }
  }

  toProjectKey(projectName: string) {
    let projectKey = deburr(projectName)
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')

    // just in case there's a project name with no alphanumerical characters
    if (projectKey === '') {
      return deburr(projectName).toLowerCase().replace(/\s+/g, '')
    }

    if (PROJECT_ALIASES[projectKey]) {
      projectKey = this.toProjectKey(PROJECT_ALIASES[projectKey])
    }
    return projectKey
  }

  getRandomizedProjectBot(projectBots: ProjectBot[]): ProjectBot | undefined {
    let attempts = 0
    while (attempts < 10) {
      const projBot =
        projectBots[Math.floor(Math.random() * projectBots.length)]
      if (projBot && projBot.editionSize > 1 && projBot.projectActive) {
        return projBot
      }
      attempts++
    }
    return undefined
  }

  // This function takes a channel and sends a message containing a random
  // token from a random open project
  async getRandomOpenProjectBot(): Promise<ProjectBot> {
    // NOTE: this fxn can't use the clean logic of the others bc it is dealing with Hasura query
    let attempts = 0
    while (attempts < 10) {
      const openProjects = await getArtblocksOpenProjects()

      const project =
        openProjects[Math.floor(Math.random() * openProjects.length)]

      const projBot = this.projects[this.toProjectKey(project.name ?? '')]
      if (projBot && projBot.editionSize > 1 && projBot.projectActive) {
        return projBot
      }
      attempts++
    }
    throw new Error("Couldn't find an open project")
  }

  getRandomizedWalletProjectBot(
    tokens: TokenDetailFragment[],
    conditional: (projectBot: ProjectBot) => boolean
  ): TokenDetailFragment | undefined {
    const myTokens = []
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index]
      if (
        conditional(this.projects[this.toProjectKey(token.project.name ?? '')])
      ) {
        myTokens.push(token)
      }
    }
    return myTokens[Math.floor(Math.random() * myTokens.length)]
  }

  // Sends a random token from this wallet's collection
  async getRandomWalletToken(
    wallet: string,
    projectKey = ''
  ): Promise<TokenDetailFragment> {
    console.log(
      `Getting random token${
        projectKey ? ` from ${projectKey}` : ''
      } in wallet ${wallet}`
    )
    // Resolve ENS name if ends in .eth
    if (wallet.toLowerCase().endsWith('.eth')) {
      const ensName = wallet

      wallet = await resolveEnsName(ensName)

      if (!wallet || wallet === '') {
        throw new Error(`Sorry, I wasn't able to resolve ENS name ${ensName}`)
      }
    }

    wallet = wallet.toLowerCase()

    let tokens = []
    if (this.walletTokens[wallet]) {
      tokens = this.walletTokens[wallet]
    } else {
      tokens = (await getAllTokensInWallet(wallet)) ?? []
      this.walletTokens[wallet] = tokens
    }

    if (tokens.length === 0) {
      throw new Error(
        `Sorry, I wasn't able to find any Art Blocks tokens in that wallet: ${wallet}`
      )
    }

    const messageType = this.getMessageType(projectKey, '')
    let chosenToken: TokenDetailFragment | undefined
    switch (messageType) {
      case MessageTypes.ARTIST:
        chosenToken = this.getRandomizedWalletProjectBot(
          tokens,
          (projectBot) => {
            return this.toProjectKey(projectBot.artistName) === projectKey
          }
        )
        break
      case MessageTypes.COLLECTION:
        chosenToken = this.getRandomizedWalletProjectBot(
          tokens,
          (projectBot) => {
            return projectBot.collection?.toLowerCase() === projectKey
          }
        )
        break
      case MessageTypes.TAG:
        chosenToken = this.getRandomizedWalletProjectBot(
          tokens,
          (projectBot) => {
            return projectBot.tags?.includes(projectKey) ?? false
          }
        )
        break
      case MessageTypes.PROJECT:
        chosenToken = this.getRandomizedWalletProjectBot(
          tokens,
          (projectBot) => {
            return this.toProjectKey(projectBot.projectName) === projectKey
          }
        )
        break
      case MessageTypes.RANDOM:
        chosenToken = tokens[Math.floor(Math.random() * tokens.length)]
        break
      default:
        break
    }

    if (!chosenToken) {
      throw new Error(
        `Sorry! Wasn't able to find any tokens matching ${projectKey} in that wallet ${wallet}`
      )
    }

    return chosenToken
  }

  async startBirthdayRoutine(
    channels: Collection<string, Channel>,
    projectConfig: any
  ) {
    setInterval(() => {
      const now = new Date()
      // Only send message if hour and minute match up with specified time
      if (
        (now.getHours() !== BIRTHDAY_CHECK_TIME.getHours() &&
          now.getHours() !== BIRTHDAY_CHECK_TIME.getHours() + 8 &&
          now.getHours() !== BIRTHDAY_CHECK_TIME.getHours() - 8) ||
        now.getMinutes() !== BIRTHDAY_CHECK_TIME.getMinutes()
      ) {
        return
      }
      const [year, month, day] = now.toISOString().split('T')[0].split('-')
      if (this.birthdays[`${month}-${day}`]) {
        this.birthdays[`${month}-${day}`].forEach((projBot) => {
          if (
            projBot.startTime &&
            projBot.startTime.getFullYear().toString() !== year &&
            !this.sentBirthdays[projBot.projectNumber]
          ) {
            projBot.sendBirthdayMessage(channels, projectConfig)
            this.sentBirthdays[projBot.projectNumber] = true
          }
        })
      }
    }, ONE_MINUTE_IN_MS)
  }

  async startTriviaRoutine() {
    setInterval(() => {
      console.log("It's trivia time!")
      let attempts = 0
      while (attempts < 10) {
        const keys = Object.keys(this.projects)
        const projectKey = keys[Math.floor(Math.random() * keys.length)]
        const projBot = this.projects[projectKey]
        if (projBot && projBot.editionSize > 1 && projBot.projectActive) {
          triviaBot.askTriviaQuestion(projBot)
          return
        }
        attempts++
      }
    }, ONE_MINUTE_IN_MS)
  }
}
