/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */


function newDislikeSubscribe(parent, args, context, info) {
  return context.db.subscription.dislike(
    { where: { mutation_in: ['CREATED'] } },
    info,
  );
}

const newDislike = {
  subscribe: newDislikeSubscribe,
};

module.exports = newDislike;
