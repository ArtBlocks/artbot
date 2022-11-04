import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.thegraph.com/subgraphs/name/artblocks/art-blocks',
  documents: ['./src/GraphQL/Subgraph/**/*.graphql'],
  generates: {
    'src/GraphQL/Subgraph/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-resolvers',
        'typed-document-node',
      ],
    },
  },
}

export default config
