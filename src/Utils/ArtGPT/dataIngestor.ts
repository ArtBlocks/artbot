import { PineconeClient } from '@pinecone-database/pinecone'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch'

import * as dotenv from 'dotenv'
dotenv.config()

const fetch = require('node-fetch')

// NOTE: This file is an active work-in-progress and currently intended to be run as a script.
//       Currently, this script can be run by calling `npx ts-node src/Utils/ArtGPT/dataIngestor.ts`
//       from the root of the repo.
// TODOs:
// - [ ] Add additional TODOs
// - [ ] Add support for passing in a repo URL as a command line argument
// - [ ] Update this script to be run in both CLI mode and as a module
// - [ ] Experiment with different chunk sizes and overlaps

async function fetchAndProcessFile(
  url: string,
  pineconeIndex: VectorOperationsApi
) {
  let response
  try {
    response = await fetch(url)
  } catch (error) {
    console.error(`Error fetching ${url}: ${error}`)
    return
  }
  const data = await response.json()
  const buff = Buffer.from(data.content, 'base64')
  const text = buff.toString('utf-8')

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 4000,
    chunkOverlap: 200,
  })

  const docs = await splitter.createDocuments([text])

  // this actually hits openai embeddings api under the hood to generate embeddings
  try {
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex,
    })
    console.log(`Done embedding and storing ${url} in Pinecone`)
  } catch (error) {
    console.error(`Error embedding and storing ${url} in Pinecone: ${error}`)
  }
}

async function processRepo(
  repoUrl: string,
  pineconeIndex: VectorOperationsApi
) {
  const response = await fetch(repoUrl)
  const repoContent = await response.json()

  for (const item of repoContent) {
    if (item.type === 'file' && item.path.endsWith('.sol')) {
      await fetchAndProcessFile(item.url, pineconeIndex)
    } else if (item.type === 'dir') {
      await processRepo(item.url, pineconeIndex)
    }
  }
}

;(async () => {
  const client = new PineconeClient()
  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENV as string,
  })
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME as string)

  // TODO: fix this
  // const docsRepoURL =
  //   'https://api.github.com/repos/ArtBlocks/artblocks-docs/contents/contracts?ref=main'
  // await processRepo(docsRepoURL, pineconeIndex)

  // TODO: start searching at top of directory, rather than in /contracts
  const contractsRepoURL =
    'https://api.github.com/repos/ArtBlocks/artblocks-contracts/contents/contracts?ref=main'
  await processRepo(contractsRepoURL, pineconeIndex)
})()
