const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { name, email, _id } = user;
  return jwt.sign({ name, email, _id }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    info: () => 'Welcome to Tare API',
    feed: async (parent, args, { Link }) => {
      const where = args.filter ? { $text: { $search: args.filter } } : {};

      const queriedLinks = await Link.find(where).skip(args.skip).limit(args.first)
        .sort(args.orderBy)
        .select('id');

      return {
        count: queriedLinks.length,
        linkIds: queriedLinks,
      };
    },

  },
  Feed: {
    links: (parent, args, { Link }) => Link.find({ where: { id_in: parent.linkIds } }),
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
      const newLink = await new Link({ ...args, postedBy: _id }).save();
      return newLink;
    },
    vote: async (parent, args, { currentUser, Vote }) => {
      const { _id } = currentUser;

      const linkExists = await Vote.find({
        user: _id,
        link: args.linkId,
      });
      if (linkExists) {
        throw new Error(`Already voted for link: ${args.linkId}`);
      }

      return new Vote({ user: _id, link: args.linkId });
    },
    addRecipe: async (root, {
      name, description, category, instructions, username,
    },
      { Recipe }) => {
      const newRecipe = await new Recipe({
        name,
        description,
        instructions,
        username,
        category,
      }).save();
      return newRecipe;
    },
    deleteUserRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOneAndRemove({ _id });
      return recipe;
    },
    likeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate({ _id }, {
        $inc: { likes: 1 },
      });
      await User.findOneAndUpdate({ username }, { $addToSet: { favorites: _id } });

      return recipe;
    },
    unLikeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate({ _id }, {
        $inc: { likes: -1 },
      });
      await User.findOneAndUpdate({ username }, { $pull: { favorites: _id } });

      return recipe;
    },

  },
};
