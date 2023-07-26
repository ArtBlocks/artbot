import * as dotenv from 'dotenv'
dotenv.config()
import { OpenAIChat } from 'langchain/llms/openai'
import { ProjectBot } from './ProjectBot'
import { Client, EmbedBuilder, Message, TextChannel } from 'discord.js'
import { projectConfig } from '..'
import { randomColor } from '../Utils/smartBotResponse'
import axios from 'axios'
import { getTokenApiUrl, replaceVideoWithGIF } from './APIBots/utils'

const CHANNEL_BLOCK_TALK = projectConfig.chIdByName['block-talk']
export class TriviaBot {
  bot: Client
  model?: OpenAIChat
  channel: TextChannel

  currentTriviaAnswer: string
  constructor(bot: Client) {
    this.bot = bot
    this.model = process.env.OPENAI_API_KEY
      ? new OpenAIChat({
          modelName: 'gpt-3.5-turbo', // With valid API keys can also use 'gpt-4'
          temperature: 0,
          prefixMessages: [
            {
              role: 'system',
              content: `
          You are a bot that thinks of trivia questions with art projects as the answers. I will provide the title of the project and the project description.
         DO NOT include the answer in your response.
          `,
            },
          ],
        })
      : undefined

    this.currentTriviaAnswer = ''
    this.channel = this.bot.channels?.cache?.get(
      CHANNEL_BLOCK_TALK
    ) as TextChannel
  }

  isActiveTriviaAnswer(projectBot: ProjectBot): boolean {
    return (
      projectBot.projectName === this.currentTriviaAnswer ||
      projectBot.artistName === this.currentTriviaAnswer
    )
  }

  tally(msg: Message) {
    msg.reply(`Congrats @${msg.author.username}! You got it!`)
    // TODO in next PR: add persistent storage for trivia scores
  }

  async askTriviaQuestion(project: ProjectBot) {
    // TODO: Add more question types: Name this collection? Name this artist?
    console.log(`Asking trivia question for ${project.projectName}`)

    this.currentTriviaAnswer = project.projectName
    const embed = await this.askChatGPTQuestion(project)

    this.channel
      .send({
        embeds: [embed],
      })
      .catch((err) => {
        console.log(
          `Error posting message in channel ${projectConfig.channels[CHANNEL_BLOCK_TALK].name} (id: ${CHANNEL_BLOCK_TALK})`,
          err.message
        )
      })
  }

  async askChatGPTQuestion(project: ProjectBot): Promise<EmbedBuilder> {
    if (!this.model) {
      console.log("Can't ask trivia question - no OpenAI API key")
      throw new Error("Can't ask trivia question - no OpenAI API key") // TODO: catch this
    }
    const question = await this.model.call(
      `Generate a short, cryptic, poetic, vague, difficult riddle that has the answer: "${project.projectName}". It is VERY important that you DO NOT include the answer in your response. The project description is: "${project.description}"`
    )
    const embed = new EmbedBuilder()
      .setTitle('Artbot Trivia Hour')
      .setDescription(question)
      .setColor(randomColor())
      .setFooter({
        text: 'Answer by using the #? command',
      })

    return embed
  }

  async askNameProjectQuestion(project: ProjectBot): Promise<EmbedBuilder> {
    const question = 'Name this project!'
    const tokenNumber = Math.floor(Math.random() * project.editionSize)

    const artBlocksResponse = await axios.get(
      getTokenApiUrl(project.coreContract, `${tokenNumber}`)
    )
    const artBlocksData = artBlocksResponse.data
    const assetUrl = await replaceVideoWithGIF(artBlocksData.preview_asset_url)
    const embed = new EmbedBuilder()
      .setTitle('Artbot Trivia Hour')
      .setDescription(question)
      .setImage(assetUrl)
      .setColor(randomColor())
      .setFooter({
        text: 'Answer by using the #? command',
      })

    return embed
  }
}
