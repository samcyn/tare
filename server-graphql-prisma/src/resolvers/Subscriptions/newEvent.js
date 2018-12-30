/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
function newEventSubscribe(parent, args, context, info) {
  return context.db.subscription.event(
    { where: { mutation_in: ['CREATED'] } },
    info,
  );
}

const newEvent = {
  subscribe: newEventSubscribe,
};

module.exports = newEvent;
