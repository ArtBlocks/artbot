import * as dotenv from 'dotenv'
dotenv.config()
import { OpenAIChat } from 'langchain/llms/openai'
import { ProjectBot } from './ProjectBot'
import { Client, EmbedBuilder, Message, TextChannel } from 'discord.js'
import { projectConfig } from '..'
import { randomColor } from '../Utils/smartBotResponse'
import axios from 'axios'
import { getTokenApiUrl, replaceVideoWithGIF } from './APIBots/utils'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const CHANNEL_BLOCK_TALK = projectConfig.chIdByName['block-talk']
export class TriviaBot {
  bot: Client
  model?: OpenAIChat
  channel?: TextChannel
  supabaseClient?: SupabaseClient

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
    this.supabaseClient =
      process.env.SUPABASE_URL && process.env.SUPABASE_API_KEY
        ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)
        : undefined
  }

  isActiveTriviaAnswer(projectBot: ProjectBot): boolean {
    return (
      projectBot.projectName === this.currentTriviaAnswer ||
      projectBot.artistName === this.currentTriviaAnswer
    )
  }

  async askTriviaQuestion(project: ProjectBot) {
    // List of ideas:
    // TODO: Add more question types: Name this collection? Name this artist?
    // TODO: Price is right style trivia
    // TODO: Different triggers? Not just time based - number of sales, LJ cursing, thank grant, etc.
    // TODO: Trait data type questions? (e.g. "Name a project that has a trait of 'blue'"), Which of these is not a Meridian trait?
    // TODO: Artist name is the answer
    console.log(`Asking trivia question for ${project.projectName}`)

    this.currentTriviaAnswer = project.projectName

    let embed = new EmbedBuilder()
      .setTitle('Artbot Trivia Hour')
      .setColor(randomColor())
      .setFooter({
        text: 'Answer by using the #? command',
      })

    embed = await this.askChatGPTQuestion(project, embed)
    this.channel = this.bot.channels?.cache?.get(
      CHANNEL_BLOCK_TALK
    ) as TextChannel
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

  async askChatGPTQuestion(
    project: ProjectBot,
    embed: EmbedBuilder
  ): Promise<EmbedBuilder> {
    if (!this.model) {
      console.log("Can't ask trivia question - no OpenAI API key")
      throw new Error("Can't ask trivia question - no OpenAI API key") // TODO: catch this
    }
    const question = await this.model.call(
      `Generate a short, cryptic, poetic, vague, difficult riddle that has the answer: "${project.projectName}". It is VERY important that you DO NOT include the answer in your response. The project description is: "${project.description}"`
    )
    embed.setDescription(question)

    return embed
  }

  async askNameProjectQuestion(
    project: ProjectBot,
    embed: EmbedBuilder
  ): Promise<EmbedBuilder> {
    const question = 'Name this project!'
    const tokenNumber = Math.floor(Math.random() * project.editionSize)

    const artBlocksResponse = await axios.get(
      getTokenApiUrl(project.coreContract, `${tokenNumber}`)
    )
    const artBlocksData = artBlocksResponse.data
    const assetUrl = await replaceVideoWithGIF(artBlocksData.preview_asset_url)

    embed.setDescription(question)
    embed.setImage(assetUrl)

    return embed
  }

  async tally(msg: Message) {
    try {
      this.currentTriviaAnswer = ''
      if (!this.supabaseClient) {
        console.log("Can't tally trivia score - no Supabase API key")
        msg.reply(
          `Uh-oh, looks like I can't tally your score. Pester Grant until he fixes it`
        )
        return
      }
      const { data } = await this.supabaseClient
        .from(process.env.TRIVIA_TABLE ?? '')
        .select(`score`)
        .eq('user', `${msg.author.username}`)

      let score = 1
      if (data?.length) {
        score = parseInt(data[0].score) + 1
      }

      msg.reply(
        `Congrats @<${msg.author.username}>! You've figured out my devious question! You now have ${score} total points!`
      )

      const { error } = await this.supabaseClient
        .from(process.env.TRIVIA_TABLE ?? '')
        .upsert({ user: `${msg.author.username}`, score: score })

      if (error) {
        msg.reply(
          `Uh-oh, looks there was an error saving your score. Pester Grant until he fixes it`
        )
        console.log('ERROR upserting', error)
      }
    } catch (err) {
      console.log('ERROR tallying', err)
      msg.reply('Oh no, looks like there was an unexpected error!')
    }
  }

  async leaderboard(msg: Message) {
    if (!this.supabaseClient) {
      console.log("Can't get leaderboard - no Supabase API key")
      msg.reply(
        `Uh-oh, looks like I can't query for the leaderboard. Pester Grant until he fixes it`
      )
      return
    }

    const { data } = await this.supabaseClient
      .from(process.env.TRIVIA_TABLE ?? '')
      .select(`user, score`)
      .order('score', { ascending: false })

    if (!data?.length) {
      msg.reply(`Uh-oh, looks like there are no scores yet!`)
      return
    }

    let leaderboardString = ''
    for (let i = 0; i < data?.length; i++) {
      const user = data[i].user
      const score = data[i].score
      leaderboardString += `${i + 1}. ${user} - ${score} points\n`
    }

    msg.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Artbot Trivia Leaderboard')
          .setColor(randomColor())
          .setDescription(leaderboardString),
      ],
    })
  }
}
