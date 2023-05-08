import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://data.artblocks.io/v1/graphql',
  documents: ['./src/Data/**/*.graphql'],
  generates: {
    'src/Data/generated/graphql.ts': {
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
