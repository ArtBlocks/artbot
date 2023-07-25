import * as dotenv from 'dotenv'
dotenv.config()
import { OpenAIChat } from 'langchain/llms/openai'
import { ProjectBot } from './ProjectBot'
import { Client, EmbedBuilder, TextChannel } from 'discord.js'
import { projectConfig } from '..'
import { randomColor } from '../Utils/smartBotResponse'

const CHANNEL_BLOCK_TALK = projectConfig.chIdByName['block-talk']
export class TriviaBot {
  bot: Client
  model: OpenAIChat
  channel: TextChannel
  constructor(bot: Client) {
    this.bot = bot
    this.model = new OpenAIChat({
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

    this.channel = this.bot.channels?.cache?.get(
      CHANNEL_BLOCK_TALK
    ) as TextChannel

    // Continue with this documentation! https://github.com/transitive-bullshit/chatgpt-api
    // Prefix: You are a bot that thinks of trivia questions. DO NOT include the answer in your response.
    //       Generate a short, cryptic, poetic, vague, difficult riddle that has the answer:
  }

  async askTriviaQuestion(project: ProjectBot) {
    // TODO: Add more question types: Name this collection? Name this artist?
    console.log(`Asking trivia question for ${project.projectName}`)

    project.activeTriviaQuestion = true
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
    // TODO: Get project image and add to embed
    const embed = new EmbedBuilder()
      .setTitle('Artbot Trivia Hour')
      .setDescription(question)
      .setColor(randomColor())
      .setFooter({
        text: 'Answer by using the #? command',
      })

    return embed
  }
}
