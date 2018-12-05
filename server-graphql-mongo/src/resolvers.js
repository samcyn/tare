/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { name, email, _id } = user;
  return jwt.sign({ name, email, _id }, secret, { expiresIn });
};

exports.resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),

  Query: {
    info: () => 'Welcome to Tare API',
    feed: async (parent, args, { Link }) => {
      const where = args.filter ? { $text: { $search: args.filter } } : {};
      const skip = args.skip || 0;
      const limit = args.first || 10;
      const orderBy = args.orderBy ? { createdAt: args.orderBy } : { createdAt: -1 };
      const queriedLinks = await Link.find(where).skip(skip).limit(limit)
        .sort(orderBy)
        .select('id');

      return {
        count: queriedLinks.length,
        linkIds: queriedLinks,
      };
    },

  },
  Feed: {
    links: async (parent, args, { Link }) => {
      const links = await Link.find({ _id: { $in: parent.linkIds } }).populate({ path: 'postedBy votes' });
      return links;
    },
  },
  AuthPayload: {
    user: (parent, args, { User }) => User.findOne({ _id: parent.userId }),
  },
  Mutation: {
    signup: async (parent, { email, name, password }, { User }) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('User already exist');
      }
      const newUser = await new User({
        name,
        email,
        password,
      }).save();

      const token = createToken(newUser, process.env.SECRET, '1hr');
      const { _id } = newUser;
      // return token and user data this contain id alone but it will be resolve in authPayload
      return {
        token,
        userId: _id,
      };
    },
    login: async (parent, { email, password }, { User }) => {
      const user = await User.findOne({ email }).select('id password');

      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      const token = createToken(user, process.env.SECRET, '1hr');
      const { _id } = user;
      // return authpayload data
      return {
        token,
        userId: _id,
      };
    },
    post: async (parent, args, { currentUser, Link }) => {
      if (!currentUser) {
        throw new Error('Not Authorised');
      }
      // get user id when user wants to post link...
      const { _id } = currentUser;
      const saveLink = await new Link({ ...args, postedBy: _id }).save();
      const newLink = await Link.populate(saveLink, { path: 'postedBy ' });
      return newLink;
    },
    vote: async (parent, args, { currentUser, Vote, Link }) => {
      // I F - U S E R - I S - N O T - L O G G E D - I N - T H E Y - C A N 'T - U P V O T E
      if (!currentUser) {
        throw new Error('Not Authorised');
      }
      // I F - L I N K - D O E S N 'T - E X I S T - T H R O W - E R R O R
      const linkExist = await Link.find({ _id: args.linkId });
      if (!linkExist) {
        throw new Error('Link doesn\'t exist');
      }
      const { _id } = currentUser;
      // C H E C K - T O - S E E - I F - U S E R - H A D - V O T E D - B E F O R E
      const voteExists = await Vote.find({
        user: _id,
        link: args.linkId,
      });
      if (voteExists && voteExists.length > 0) {
        throw new Error(`Already voted for link: ${args.linkId}`);
      }
      // S A V E - N E W - VO T E
      const saveVote = await new Vote({ user: _id, link: args.linkId }).save();
      /* P O P U L A T E - N E W - V O T E - W I T H - U S E R -
      A N D - L I N K - C R E N D E N T I A L S */
      const newVote = await Vote.populate(saveVote, { path: 'link user' });
      return newVote;
    },
    // addRecipe: async (root, {
    //   name, description, category, instructions, username,
    // },
    //   { Recipe }) => {
    //   const newRecipe = await new Recipe({
    //     name,
    //     description,
    //     instructions,
    //     username,
    //     category,
    //   }).save();
    //   return newRecipe;
    // },
    // deleteUserRecipe: async (root, { _id }, { Recipe }) => {
    //   const recipe = await Recipe.findOneAndRemove({ _id });
    //   return recipe;
    // },
    // likeRecipe: async (root, { _id, username }, { Recipe, User }) => {
    //   const recipe = await Recipe.findOneAndUpdate({ _id }, {
    //     $inc: { likes: 1 },
    //   });
    //   await User.findOneAndUpdate({ username }, { $addToSet: { favorites: _id } });

    //   return recipe;
    // },
    // unLikeRecipe: async (root, { _id, username }, { Recipe, User }) => {
    //   const recipe = await Recipe.findOneAndUpdate({ _id }, {
    //     $inc: { likes: -1 },
    //   });
    //   await User.findOneAndUpdate({ username }, { $pull: { favorites: _id } });

    //   return recipe;
    // },

  },
};
