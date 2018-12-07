/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../../utils/authenticated');

async function signup(parent, args, context) {
  // hashed password in the arguments...
  const password = await bcrypt.hash(args.password, 10);
  // create user into db.. note user only contain id..
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, '{ id }');

  // generate token....
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

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
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  // return authpayload data
  return {
    token,
    user,
  };
}

async function updateUser(parent, args, context, info) {
  // G E T - T H E - L O G G E D - I N - U S E R - I D
  const userId = getUserId(context);

  const user = await context.db.query.user({ where: { id: userId } }, 'isAdmin');

  if (userId !== args.userId || !user.isAdmin) {
    throw new Error('Not Authorised to update another user credentials');
  }

  // hashed password in the arguments...
  const password = await bcrypt.hash(args.password, 10);
  // create user into db.. note user only contain id..
  return context.db.mutation.updateUser({
    data: { ...args, password },
    where: { id: userId },
  }, info);
}


async function deleteUser(parent, args, context, info) {
  // G E T - T H E - L O G G E D - I N - U S E R - I D
  const userId = getUserId(context);

  const user = await context.db.query.user({ where: { id: userId } }, 'isAdmin');

  if (userId !== args.userId || !user.isAdmin) {
    throw new Error('Not Authorised to delete another user credentials');
  }

  // U P D A T E - U S E R
  return context.db.mutation.updateUser({
    data: { deleted: true },
    where: { id: userId },
  }, info);
}

module.exports = {
  signup,
  login,
  updateUser,
  deleteUser,
};
