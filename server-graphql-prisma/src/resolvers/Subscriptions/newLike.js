/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */


function newLikeSubscribe(parent, args, context, info) {
  return context.db.subscription.like(
    { where: { mutation_in: ['CREATED'] } },
    info,
  );
}

const newLike = {
  subscribe: newLikeSubscribe,
};


module.exports = newLike;
