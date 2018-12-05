/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

// R E S O L V E R S
const Query = require('./resolvers/Queries');
const Mutation = require('./resolvers/Mutations');
const Subscription = require('./resolvers/Subscriptions');
const AuthPayload = require('./resolvers/AuthPayload');
const EventFeed = require('./resolvers/EventFeed');
const UserFeed = require('./resolvers/UserFeed');
const CategoryFeed = require('./resolvers/CategoryFeed');

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  UserFeed,
  EventFeed,
  CategoryFeed,
};

// I N I T I A L I Z E - G R A P H Q L - S E R V E R
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

// S T A R T -T H E - S E R V E R
server.start(() => console.log('Server is running on http://localhost:4000'));
