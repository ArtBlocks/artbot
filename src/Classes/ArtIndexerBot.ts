/* eslint-disable no-case-declarations */
import { Channel, Collection, Message } from 'discord.js'
import * as dotenv from 'dotenv'

import { ProjectBot } from './ProjectBot'
import {
  getAllProjects,
  getArtblocksOpenProjects,
  getAllTokensInWallet,
  getMostRecentMintedTokenByContracts,
  getAllContracts,
  getMostRecentMintedFlagshipToken,
  getArtblocksNextUpcomingProject,
  getEntryByTag,
  getEntryByVertical,
} from '../Data/queryGraphQL'
import { projectConfig, triviaBot } from '..'
import {
  Categories_Enum,
  ContractDetailFragment,
  ProjectDetailFragment,
  ProjectTokenDetailFragment,
  TokenDetailFragment,
} from '../../generated/graphql'
import {
  getVerticalName,
  isVerticalName,
  resolveEnsName,
} from './APIBots/utils'
import { ProjectConfig } from '../ProjectConfig/projectConfig'
dotenv.config()

const deburr = require('lodash.deburr')

const PROJECT_ALIASES = require('../ProjectConfig/project_aliases.json')
const CONTRACT_ALIASES: {
  aliases: string[]
  named_contracts: string[]
}[] = require('../ProjectConfig/contract_aliases.json')

const { isWallet } = require('./APIBots/utils')

const METADATA_REFRESH_INTERVAL_MINUTES =
  process.env.METADATA_REFRESH_INTERVAL_MINUTES ?? '480' // 8 hours
const ONE_MINUTE_IN_MS = 60000

export enum MessageTypes {
  RANDOM = 'random',
  RANDOM_ALL = 'random_all',
  ARTIST = 'artist',
  COLLECTION = 'collection',
  TAG = 'tag',
  PROJECT = 'project',
  OPEN = 'open',
  WALLET = 'wallet',
  RECENT = 'recent',
  ENTRY = 'entry',
  PLATFORM = 'platform',
  UPCOMING = 'upcoming',
  UNKNOWN = 'unknown',
}

type ProjectBotAndToken = {
  projectBot: ProjectBot
  tokenId: string
}

export class ArtIndexerBot {
  projectFetch: () => Promise<ProjectDetailFragment[]>
  projects: { [id: string]: ProjectBot } = {}
  artists: { [id: string]: ProjectBot[] } = {}
  birthdays: { [id: string]: ProjectBot[] } = {}
  collections: { [id: string]: ProjectBot[] } = {}
  tags: { [id: string]: ProjectBot[] } = {}
  projectsById: { [id: string]: ProjectBot } = {}
  contracts: { [id: string]: ContractDetailFragment } = {}
  walletTokens: { [id: string]: TokenDetailFragment[] } = {}
  initialized = false

  platforms: { [id: string]: ProjectBot[] } = {}
  flagship: { [id: string]: ProjectBot } = {}

  constructor(projectFetch = getAllProjects) {
    this.projectFetch = projectFetch
    this.init()
  }

  /**
   * Initialize async aspects of the FactoryBot
   */
  async init() {
    await this.buildProjectBots()

    if (this.projectFetch === getAllProjects) {
      await this.buildContracts()
      projectConfig.initializeProjectBots()
    }
    setInterval(async () => {
      this.logDictionarySizes()
      await this.buildProjectBots()
      if (this.projectFetch === getAllProjects) {
        projectConfig.initializeProjectBots()
      }
    }, parseInt(METADATA_REFRESH_INTERVAL_MINUTES) * ONE_MINUTE_IN_MS)
  }

  private logDictionarySizes() {
    console.log('ArtIndexerBot Dictionary Sizes:')
    console.log(`projects: ${Object.keys(this.projects).length}`)
    console.log(`artists: ${Object.keys(this.artists).length}`)
    console.log(`birthdays: ${Object.keys(this.birthdays).length}`)
    console.log(`collections: ${Object.keys(this.collections).length}`)
    console.log(`tags: ${Object.keys(this.tags).length}`)
    console.log(`projectsById: ${Object.keys(this.projectsById).length}`)
    console.log(`contracts: ${Object.keys(this.contracts).length}`)
    console.log(`walletTokens: ${Object.keys(this.walletTokens).length}`)
    console.log(`platforms: ${Object.keys(this.platforms).length}`)
    console.log(`flagship: ${Object.keys(this.flagship).length}`)
  }

  async buildContracts() {
    try {
      const arbContractsArr = await getAllContracts(true)
      for (let i = 0; i < arbContractsArr.length; i++) {
        const name = arbContractsArr[i].name
        if (typeof name === 'string') {
          this.contracts[name.toLowerCase()] = arbContractsArr[i]
        }
      }

      const ethContractsArr = await getAllContracts(false)
      for (let i = 0; i < ethContractsArr.length; i++) {
        const name = ethContractsArr[i].name
        if (typeof name === 'string') {
          this.contracts[name.toLowerCase()] = ethContractsArr[i]
        }
      }
    } catch (e) {
      console.error('Error in buildContracts', e)
    }
  }

  async buildProjectBots() {
    try {
      this.clearDictionaries()
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
          artistName: project.artist_name ?? 'unknown artist',
          collection,
          tags,
          startTime: bday ? new Date(bday) : undefined,
        })

        const projectKey = this.toProjectKey(project.name ?? 'unknown project')
        const projectKeyWithArtist = this.toProjectKey(
          `${project.artist_name} ${project.name}`
        )
        this.projects[projectKeyWithArtist] = newBot

        if (
          project.vertical.category_name === 'collaborations' ||
          project.vertical.category_name === 'explorations'
        ) {
          project.is_artblocks = true
        }
        if (
          (this.projects[projectKey] && project.is_artblocks) ||
          !this.projects[projectKey]
        ) {
          // Overwrite if it's a flagship project
          this.projects[projectKey] = newBot
        }
        this.projectsById[project.id] = newBot

        if (bday) {
          const [, month, day] = bday.split('T')[0].split('-')
          bday = month + '-' + day
          this.birthdays[bday] = this.birthdays[bday] ?? []
          this.birthdays[bday].push(newBot)
        }
        const artistName = this.cleanKey(
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

        if (project.is_artblocks) {
          this.flagship[projectKey] = newBot
          this.platforms['artblocks'] = this.platforms['artblocks'] ?? []
          this.platforms['artblocks'].push(newBot)
        } else {
          const platform = this.cleanKey(
            project.contract.name ?? 'Unknown contract'
          )
          this.platforms[platform] = this.platforms[platform] ?? []
          this.platforms[platform].push(newBot)
        }
      }

      // Set up contract aliases
      CONTRACT_ALIASES.forEach((item) => {
        const aliases = item.aliases
        const named_contracts = item.named_contracts
        const allPlatformProjects: ProjectBot[] = []
        named_contracts.forEach((named_contract) => {
          const platformName = this.cleanKey(named_contract)
          if (this.platforms[platformName]) {
            allPlatformProjects.push(...this.platforms[platformName])
          }
        })

        aliases.forEach((alias) => {
          this.platforms[alias] = this.platforms[alias] ?? []
          this.platforms[alias].push(...allPlatformProjects)
        })
      })
    } catch (err) {
      console.error(`Error while initializing ArtIndexerBots\n${err}`)
    }
  }

  private clearDictionaries() {
    this.projects = {}
    this.artists = {}
    this.birthdays = {}
    this.collections = {}
    this.tags = {}
    this.projectsById = {}
    this.platforms = {}
    this.flagship = {}
    // Don't clear contracts or walletTokens as they are managed separately
  }

  // Please update HASHTAG_MESSAGE in smartBotResponse.ts if you add more options here
  getMessageType(
    key: string,
    afterTheHash: string,
    messageContent?: string
  ): MessageTypes {
    if (key === '#?') {
      return MessageTypes.RANDOM
    } else if (key === 'all') {
      return MessageTypes.RANDOM_ALL
    } else if (key === 'upcoming') {
      return MessageTypes.UPCOMING
    } else if (messageContent?.startsWith('#recent')) {
      return MessageTypes.RECENT
    } else if (messageContent?.startsWith('#entry')) {
      return MessageTypes.ENTRY
    } else if (key === 'open') {
      return MessageTypes.OPEN
    } else if (isVerticalName(key)) {
      return MessageTypes.COLLECTION
    } else if (this.tags[key]) {
      return MessageTypes.TAG
    } else if (this.artists[key]) {
      return MessageTypes.ARTIST
    } else if (this.platforms[key]) {
      return MessageTypes.PLATFORM
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
        if (Object.keys(this.flagship).length > 0) {
          return this.getRandomizedProjectBot(Object.values(this.flagship))
        }
        return this.getRandomizedProjectBot(Object.values(this.projectsById))
      case MessageTypes.RANDOM_ALL:
        return this.getRandomizedProjectBot(Object.values(this.projectsById))
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
      case MessageTypes.PLATFORM:
        return this.getRandomizedProjectBot(this.platforms[key])
      case MessageTypes.PROJECT:
        if (this.flagship[key]) {
          return this.flagship[key]
        }
        return this.projects[key]
      case MessageTypes.WALLET:
      case MessageTypes.RECENT:
      case MessageTypes.UPCOMING:
      case MessageTypes.UNKNOWN:
        return undefined
    }
  }

  async handleNumberMessage(msg: Message) {
    const content = msg.content

    if (!msg.channel.isSendable()) {
      return
    }

    if (content.length <= 1) {
      msg.channel.send(
        `Invalid format, enter # followed by the piece number of interest.`
      )
      return
    }

    console.log('Handling message', content)

    if (content.toLowerCase().startsWith('#floor')) {
      msg.channel.send(
        `The \`#floor\` command has changed to \`#entry\`. Please try using \`#entry\` instead!`
      )
      return
    }

    // Handle #entry commands for groupings
    if (content.toLowerCase().startsWith('#entry')) {
      try {
        await this.handleEntryMessage(msg)
      } catch (error) {
        msg.channel.send(`Sorry, I had trouble understanding that: ${content}`)
        console.error('Error handling #entry message', error)
        return
      }
      return
    }

    let afterTheHash = content
      .substr(content.indexOf(' ') + 1)
      .replace('?details', '')

    let projectKey = this.toProjectKey(afterTheHash)

    const messageType = this.getMessageType(
      projectKey,
      afterTheHash,
      msg.content.toLowerCase()
    )

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
    } else if (messageType === MessageTypes.RECENT) {
      let token = await this.getContractTokenForKey(afterTheHash)
      if (
        !token &&
        (afterTheHash === msg.content ||
          afterTheHash.replace(' ', '').length === 0)
      ) {
        // use flagship contract
        token = await getMostRecentMintedFlagshipToken()
      } else if (!token) {
        console.error('Bad value specified for recent', afterTheHash)
        msg.channel.send('Sorry, I was not able to understand that.')
        return
      }

      const projectId = token.project_id

      projectBot = this.projectsById[projectId]
      msg.content = `#${token?.invocation}`
    } else if (messageType === MessageTypes.UPCOMING) {
      try {
        const upcomingProjectDetails = await getArtblocksNextUpcomingProject()
        projectBot = this.projectsById[upcomingProjectDetails.id]
        projectBot.handleUpcomingMessage(msg, upcomingProjectDetails)
        return
      } catch (error) {
        console.warn(error)
      }
    } else {
      projectBot = await this.projectBotForMessage(projectKey, afterTheHash)
    }

    if (!projectBot) {
      console.log("Wasn't able to parse message", content)
      return
    }

    if (
      messageType === MessageTypes.ARTIST &&
      triviaBot.isArtistActiveTriviaAnswer(projectBot?.artistName)
    ) {
      triviaBot.tally(msg)
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

  cleanKey(key: string): string {
    let projectKey = deburr(key)
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')

    // just in case there's a project name with no alphanumerical characters
    if (projectKey === '') {
      projectKey = deburr(key).toLowerCase().replace(/\s+/g, '')
    }
    return projectKey
  }

  toProjectKey(projectName: string) {
    let projectKey = this.cleanKey(projectName)
    if (PROJECT_ALIASES[projectKey]) {
      projectKey = this.cleanKey(PROJECT_ALIASES[projectKey])
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

  async getContractTokenForKey(
    key: string
  ): Promise<ProjectTokenDetailFragment | null> {
    try {
      const lowerCaseKey = key.toLowerCase()
      let contracts: string[]
      const namedContract = this.contracts[lowerCaseKey]
      const alias = CONTRACT_ALIASES.filter((obj) =>
        obj.aliases.includes(lowerCaseKey)
      )
      if (namedContract) {
        contracts = [namedContract.address]
      } else if (alias.length > 0) {
        // aliases
        contracts = alias[0].named_contracts.map(
          (contract) => this.contracts[contract.toLowerCase()].address
        )
      } else {
        // try it being just a contract address
        contracts = [lowerCaseKey]
      }
      const token = await getMostRecentMintedTokenByContracts(contracts)
      return token
    } catch (e) {
      console.error('Error in getContractTokenForKey', e)
      return null
    }
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

  async checkBirthdays(
    channels: Collection<string, Channel>,
    projectConfig: ProjectConfig,
    artistChannel: boolean
  ) {
    const now = new Date()
    const [year, month, day] = now.toISOString().split('T')[0].split('-')
    const sentMessages: { [id: string]: boolean } = {}
    console.log(`${this.birthdays[`${month}-${day}`]?.length} birthdays today!`)
    if (this.birthdays[`${month}-${day}`]) {
      this.birthdays[`${month}-${day}`].forEach((projBot) => {
        if (
          projBot.startTime &&
          projBot.startTime.getFullYear().toString() !== year &&
          !sentMessages[projBot.id]
        ) {
          projBot.sendBirthdayMessage(channels, projectConfig, artistChannel)
          sentMessages[projBot.id] = true
        }
      })
    }
  }

  askRandomTriviaQuestion() {
    let attempts = 0
    while (attempts < 10) {
      const keys = Object.keys(this.flagship)
      const projectKey = keys[Math.floor(Math.random() * keys.length)]
      const projBot = this.flagship[projectKey]
      if (
        projBot &&
        projBot.editionSize > 1 &&
        projBot.projectActive &&
        !triviaBot.alreadyAsked(projBot)
      ) {
        triviaBot.askTriviaQuestion(projBot)
        return
      }
      attempts++
    }
  }

  getProjectsWithNamedMappings(): ProjectBot[] {
    const projects = Object.values(this.projects).filter((projBot) => {
      return projBot.namedHandler?.hasNamed()
    })
    return projects
  }

  checkMintedOut(projectId: string, invocation: string) {
    const projectBot = this.projectsById[projectId]
    const invocationNumber = parseInt(invocation)
    if (
      !projectBot ||
      !projectBot.maxEditionSize ||
      projectBot.maxEditionSize - 1 !== invocationNumber
    ) {
      return
    }
    console.log(
      `Sending minted out message for ${projectBot.projectName} with ${projectBot.maxEditionSize} tokens. Invocation: ${invocation}`
    )

    projectBot.sendMintedOutMessage()
  }

  /**
   * Check if a project has the AB500 tag
   * @param projectId The project ID to check
   * @returns true if the project has the "ab500" tag, false otherwise
   */
  isAB500(projectId: string): boolean {
    const ab500Projects = this.tags['ab500']
    if (!ab500Projects) {
      return false
    }

    return ab500Projects.some((projectBot) => projectBot.id === projectId)
  }

  /**
   * Handle #entry commands for both projects and groupings (tags and verticals)
   */
  async handleEntryMessage(msg: Message) {
    if (!msg.channel.isSendable()) {
      return
    }

    const content = msg.content.trim()
    const parts = content.split(' ')

    if (parts.length < 2) {
      msg.channel.send(
        'Please specify a project or grouping. Format: `#entry [project/grouping]`\n' +
          'Examples: `#entry Fidenza`, `#entry AB500`, `#entry Curated`, `#entry Curated Series 1`'
      )
      return
    }

    // Extract the target name (everything after "#entry")
    const target = content.substring(6).trim() // Remove "#entry"
    const targetKey = this.toProjectKey(target)

    const messageType = this.getMessageType(targetKey, target)
    let projectBot: ProjectBot | undefined

    if (messageType === MessageTypes.PROJECT) {
      projectBot = await this.projectBotForMessage(targetKey, target)
    } else if (messageType === MessageTypes.COLLECTION) {
      const vertical = getVerticalName(target.toLowerCase())
      const entryProjects = await getEntryByVertical(vertical, 1)

      if (entryProjects.length === 0) {
        msg.channel.send(
          `Sorry, I wasn't able to find any projects for sale with the vertical ${vertical}`
        )
        return
      }

      const projectKey = this.toProjectKey(entryProjects[0].name ?? '')
      projectBot = await this.projectBotForMessage(
        projectKey,
        `#entry ${entryProjects[0].name}`
      )
    } else if (messageType === MessageTypes.TAG) {
      const tag = target
      const entryProjects = await getEntryByTag(tag.toLowerCase(), 1)

      if (entryProjects.length === 0) {
        msg.channel.send(
          `Sorry, I wasn't able to find any projects for sale with the tag ${tag}`
        )
        return
      }

      const projectKey = this.toProjectKey(entryProjects[0].name ?? '')
      projectBot = await this.projectBotForMessage(
        projectKey,
        `#entry ${entryProjects[0].name}`
      )
    }

    if (!projectBot) {
      msg.channel.send(
        `Sorry, I wasn't able to find any projects for sale with the query ${target}`
      )
      return
    }

    await projectBot?.handleNumberMessage(msg)
    return
  }
}
