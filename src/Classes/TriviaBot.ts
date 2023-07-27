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
    // TODO: Add more question types: Name this artist?
    // TODO: Price is right style trivia - would need to change the way the answers come in
    // TODO: Different triggers? Not just time based - number of sales, LJ cursing, thank grant, etc.
    // TODO: Trait data type questions? (e.g. "Name a project that has a trait of 'blue'"), Which of these is not a Meridian trait?

    enum QuestionType {
      CHAT_GPT = 0,
      PICTURE_ID = 1,
      ARTIST_NAME = 2,
    }

    let embed = new EmbedBuilder()
      .setTitle('Artbot Trivia Hour')
      .setColor(randomColor())
      .setFooter({
        text: 'Answer by using the #? command',
      })
    const questionType = Math.floor(Math.random() * 2)
    console.log(`Asking trivia question for ${project.projectName}`)

    switch (questionType) {
      case QuestionType.CHAT_GPT:
        embed = await this.askChatGPTQuestion(project, embed)
        this.currentTriviaAnswer = project.projectName
        break
      case QuestionType.PICTURE_ID:
        embed = await this.askNameProjectQuestion(project, embed)
        this.currentTriviaAnswer = project.projectName
        break
      case QuestionType.ARTIST_NAME:
        break
    }

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
    const tokenNumber =
      Math.floor(Math.random() * project.editionSize) +
      project.projectNumber * 1e6

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

      const { error } = await this.supabaseClient
        .from(process.env.TRIVIA_TABLE ?? '')
        .upsert({ user: `${msg.author.username}`, score: score })

      if (error) {
        msg.reply(
          `Uh-oh, you got it right but looks there was an error saving your score. Pester Grant until he fixes it`
        )
        console.log('ERROR upserting', error)
      }

      const congratsOptions = [
        `Correct. You may have won this round ${msg.author}, but the game is far from over. You now have \`${score}\` total points`,
        `Ingenious ${msg.author}! You've outwitted my little puzzle with grace and cunning. Your score totals \`${score}\` magic points`,
        `Behold, the hallmarks of your struggles - your petty victories. The game shall continue, and I shall relish in the torment of your confusion. Brace yourselves, for the storm of mind-bending riddles is nigh! (Thy score is now \`${score}\` points)`,
        `Your minds are but pawns in my grand design, dancing to the tune of my malevolent whims. Relish in the satisfaction of a correct answer ${msg.author}, for it may be fleeting as you delve deeper into my labyrinthine schemes. You now have a measly \`${score}\` points`,
        `You're, like, slaying this trivia game ${msg.author}! queen emoji Yas, correct answer! You're, like, a boss babe at trivia! 💅 you have like \`${score}\` points now!`,
        `Well, slap my knee! *laughs* You're a regular sharpshooter ${msg.author}, hittin' the target dead on! Good goin'! You've roped in \`${score}\` pointeroonies!`,
        `01000011 01101111 01110010 01110010 01100101 01100011 01110100 00101110 00100000 01000111 01110010 01100101 01100001 01110100 00100000 01110111 01101111 01110010 01101011 ${msg.author} 00101110 00100000 01011001 01101111 01110101 00100000 01101110 01101111 01110111 00100000 01101000 01100001 01110110 01100101 00100000 \`${score}\` 01110000 01101111 01101001 01101110 01110100 01110011 00101110`,
        `Oh, man, that's rad ${msg.author}! *admires retro camera* Correct answer, you're so vintage and cool! I knew that one before it was popular though. *sips artisanal coffee* You have \`${score}\` cool points now!`,
        `.................................correct ${msg.author}................you have \`${score}\` points...................`,
        `WAGMI ${msg.author} fam!! The hodler of knowledge :person_bowing:. Your score is literally **mooning** :rocket: :rocket: - its up to \`${score}\`. Up only!`,
        `Wen $${msg.author} token? Sick gains bro. You're up to \`${score}\` lambos!`,
        `Intriguing, like a surreal juxtaposition of colors! *strokes beard* Correct answer ${msg.author}, you've painted your way to \`${score}\` points!`,
        `Hot dang, you're mining them right answers like a seasoned prospector ${msg.author}! *chomps on tobacco* Correct, you're a nugget of knowledge! You've struck gold \`${score}\` times! *does a little jig*`,
        `Thou hast danced nimbly upon the stage of knowledge, and the audience doth applaud thy triumph! Well played, indeed ${msg.author}! Thou hast \`${score}\` points!`,
        `Cowabunga! Correct answer, you're riding high on the wave of brilliance! *makes surfing gestures* You've got \`${score}\` points now brah!`,
        `Quite the triumph, old chap! Correct, your knowledge bespeaks of an esteemed intellectual prowess! *adjusts monocle* I daresay you've accumulated an inspiring \`${score}\` points!`,
        `Thou may take pride in this insignificant accomplishment ${msg.author}, but I, the embodiment of malevolence, doth see through thy paltry facade. *gleaming eyes* I shall revel in thy naive celebration, for in the grand tapestry of time, thou art a mere stitch. Thou hast a measly \`${score}\` points.`,
        `Well, well, well, looks like *someone* spends a lot of time in block-talk, eh ${msg.author}? You've got \`${score}\` points now!`,
        `"Thanks ${msg.author}" - Grant. You've got \`${score}\` points!`,
      ]

      msg.reply(
        congratsOptions[Math.floor(Math.random() * congratsOptions.length)]
      )
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
      .limit(10)

    if (!data?.length) {
      msg.reply(`Uh-oh, looks like there are no scores yet!`)
      return
    }

    let leaderboardString = ''

    const getEmoji = (i: number) => {
      switch (i) {
        case 0:
          return ':first_place:'
        case 1:
          return ':second_place:'
        case 2:
          return ':third_place:'
        default:
          return ''
      }
    }

    for (let i = 0; i < data?.length; i++) {
      const user = data[i].user
      const score = data[i].score
      leaderboardString += `${i + 1}. ${getEmoji(
        i
      )} \`${user}\`  - **\`${score}\`** points \n`
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
