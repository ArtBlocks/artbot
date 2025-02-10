import * as dotenv from 'dotenv'
dotenv.config()
import { EmbedBuilder, Message } from 'discord.js'
import axios from 'axios'
import { randomColor } from '../Utils/smartBotResponse'

export class InsightsBot {
  async getInsightsApiResponse(msg: Message): Promise<EmbedBuilder> {
    // strip out !artBot from the message
    const messageContent = msg.content.replace('!artBot', '').trim()

    // TODO: Implement insights API endpoint once deployed
    const insightsResponse = await axios.post(
      'https://www.example.com/insights',
      {
        message: messageContent,
      }
    )

    let answer = insightsResponse?.data ?? ''

    if (!answer.length) {
      throw new Error('No answer from Insights API')
    }

    let embed = new EmbedBuilder()
      .setTitle('Artbot AI (Beta)')
      .setColor(randomColor())
      .setDescription(answer)
      .setFooter({
        text: 'This response is AI-generated. Let us know what you think!',
      })

    return embed
  }
}
