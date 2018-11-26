const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

// queries, mutations and subscriptions
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');
const Feed = require('./resolvers/Feed');

// resolvers
const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed,
};

// initialize graphql server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/samson-iyanda-afb0fd/database/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
});

// start server
server.start(() => console.log('Server is running on http://localhost:4000'));
