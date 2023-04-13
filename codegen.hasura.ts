import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [process.env.HASURA_GRAPHQL_ENDPOINT ?? '']: {
      headers: {
        apikey: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
  documents: ['./src/GraphQL/Hasura/**/*.graphql'],
  generates: {
    'src/GraphQL/Hasura/generated/graphql.ts': {
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
