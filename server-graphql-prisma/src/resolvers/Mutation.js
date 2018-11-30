const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils/authenticated');

async function signup(parent, args, context) {
  // hashed password in the arguments...
  const password = await bcrypt.hash(args.password, 10);
  // create user into db.. note user only contain id..
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, '{ id }');

  // generate token....
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // return token and user data this contain id alone but it will be resolve in authPayload
  return {
    token,
    user,
  };
}

async function login(parent, args, context) {
  // find user return id and password field alone
  const user = await context.db.query.user({ where: { email: args.email } }, '{ id password }');
  if (!user) {
    throw new Error('No such user found');
  }

  // compare passwords
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  // generate token
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // return authpayload data
  return {
    token,
    user,
  };
}

function post(parent, args, context, info) {
  // get user id when user wants to post link...
  const userId = getUserId(context);
  return context.db.mutation.createLink(
    {
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      },
    },
    info,
  );
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);

  const linkExists = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: args.linkId },
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
      },
    },
    info,
  );
}

module.exports = {
  signup,
  login,
  post,
  vote,
};
