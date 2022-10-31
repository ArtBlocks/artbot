module.exports = {
  overwrite: true,
  schema: {
    'https://api.thegraph.com/subgraphs/name/artblocks/art-blocks': {},
  },
  documents: ['./src/GraphQL/Subgraph/**/*.graphql'],
  generates: {
    './src/GraphQL/Subgraph/generated/graphql.ts': {
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
