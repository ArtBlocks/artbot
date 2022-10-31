module.exports = {
  overwrite: true,
  schema: {
    [process.env.HASURA_GRAPHQL_ENDPOINT]: {
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
  documents: ['./src/GraphQL/Hasura/**/*.graphql'],
  generates: {
    './src/GraphQL/Hasura/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-urql',
        'typed-document-node',
      ],
      config: {
        maybeValue: 'T | null | undefined',
        scalars: {
          BigInt: 'string',
          BigDecimal: 'string',
          Bytes: 'string',
          timestamptz: 'string',
        },
        withHooks: false,
      },
    },
  },
}
