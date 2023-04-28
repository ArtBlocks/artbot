import * as dotenv from 'dotenv'

import { PineconeClient } from '@pinecone-database/pinecone'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch'

// NOTE: This file is an active work-in-progress and currently intended to be run as a script.
//       Currently, this script can be run by calling `npx ts-node src/Utils/ArtGPT/dataIngestor.ts`
//       from the root of the repo.
// TODOs:
// - [ ] Add additional TODOs
// - [ ] Add support for passing in a repo URL as a command line argument
// - [ ] Update this script to be run in both CLI mode and as a module
// - [ ] Experiment with different chunk sizes and overlaps

const fetch = require('node-fetch')

dotenv.config()

async function fetchAndProcessFile(
  url: string,
  pineconeIndex: VectorOperationsApi
) {
  const response = await fetch(url)
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
  console.log(`Done embedding and storing ${url} in Pinecone`)
}

async function processRepo(repoUrl: string) {
  const client = new PineconeClient()
  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENV as string,
  })
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME as string)

  const response = await fetch(repoUrl)
  const repoContent = await response.json()

  const fileUrls = repoContent
    .filter((item: any) => item.type === 'file' && item.path.endsWith('.sol'))
    .map((item: any) => item.url)

  for (const fileUrl of fileUrls) {
    await fetchAndProcessFile(fileUrl, pineconeIndex)
  }
}

const repoUrl =
  'https://api.github.com/repos/ArtBlocks/artblocks-contracts/contents/contracts?ref=main'
processRepo(repoUrl)
