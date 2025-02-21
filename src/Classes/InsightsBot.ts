import * as dotenv from 'dotenv'
dotenv.config()
import { EmbedBuilder, Message } from 'discord.js'
import axios from 'axios'
import { randomColor } from '../Utils/smartBotResponse'

export class InsightsBot {
  async getInsightsApiResponse(msg: Message): Promise<EmbedBuilder> {
    try {
      // strip out !artBot from the message
      const messageContent = msg.content.replace('!artBot', '').trim()

      const insightsResponse = await axios.post(
        'https://qhjte7logh.execute-api.us-east-1.amazonaws.com/production-stage/insights',
        {
          query: messageContent,
        },
        {
          headers: {
            'x-api-key': process.env.INSIGHTS_API_KEY ?? '',
            'Content-Type': 'application/json',
          },
        }
      )

      const answer = insightsResponse?.data?.[0]?.content ?? ''

      if (!answer.length) {
        throw new Error('No answer from Insights API')
      }

      const answerWithFeedback = `${answer}\n\nThis response is AI-generated. Let us know what you think in <#769251416778604562>!`

      const embed = new EmbedBuilder()
        .setTitle('Artbot AI (Beta)')
        .setColor(randomColor())
        .setDescription(answerWithFeedback)

      return embed
    } catch (error) {
      console.error('Error getting insights API response:', error)
      return new EmbedBuilder()
        .setTitle('Error')
        .setColor('#FF0000')
        .setDescription(
          'Sorry, I encountered an error while processing your request. Please try again later.'
        )
        .setFooter({
          text: 'If this persists, please contact the bot administrator.',
        })
    }
  }
}
