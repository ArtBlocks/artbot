import * as dotenv from 'dotenv'
dotenv.config()
import { ChatGPTAPI } from 'chatgpt'
export class TriviaBot {
  model: ChatGPTAPI
  constructor() {
    this.model = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY ?? '',
      completionParams: {
        model: 'gpt-3.5-turbo',
      },
    })
    console.log('TriviaBot initialized')
    const r = this.model
      .sendMessage(
        `You are a bot that thinks of trivia questions. DO NOT include the answer in your response. 
      Generate a short, cryptic, poetic, vague, difficult riddle that has the answer: Fidenza`
      )
      .then((r) => {
        console.log(r)
      })
    // Continue with this documentation! https://github.com/transitive-bullshit/chatgpt-api
    // Prefix: You are a bot that thinks of trivia questions. DO NOT include the answer in your response.
    //       Generate a short, cryptic, poetic, vague, difficult riddle that has the answer:
  }
}
