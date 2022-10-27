module.exports = {
  overwrite: true,
  schema: {
    [process.env.HASURA_GRAPHQL_ENDPOINT]: {
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
  documents: ['./src/Utils/Hasura/**/*.graphql'],
  generates: {
    './src/Utils/Hasura/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
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
