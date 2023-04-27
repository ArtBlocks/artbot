import * as dotenv from 'dotenv'
import { PineconeClient } from '@pinecone-database/pinecone'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
const fetch = require('node-fetch')

dotenv.config()

// prototype function to embed a single document and store it in Pinecone
;(async function proto() {
  const client = new PineconeClient()
  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENVIRONMENT as string,
  })
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string)
  const response = await fetch(
    'https://api.github.com/repos/ArtBlocks/artblocks-contracts/contents/contracts/GenArt721CoreV3.sol?ref=main'
  )
  const data = await response.json()
  const buff = Buffer.from(data.content, 'base64')
  const text = buff.toString('utf-8')

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 4000,
    chunkOverlap: 200,
  })

  const docs = await splitter.createDocuments([text])

  // this actually hits openai embeddings api under the hood to generate embeddings
  await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    pineconeIndex,
  })
  console.log('done embedding and storing in pinecone')
})()

// (async function main() {

// })()
