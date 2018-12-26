/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
function newUserSubscribe(parent, args, context, info) {
  return context.db.subscription.user(
    { where: { mutation_in: ['CREATED'] } },
    info,
  );
}

const newUser = {
  subscribe: newUserSubscribe,
};

module.exports = newUser;
