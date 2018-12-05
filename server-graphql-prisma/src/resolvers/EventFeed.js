/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

function events(parent, args, context, info) {
  return context.db.query.events({ where: { id_in: parent.eventIds } }, info);
}

module.exports = {
  events,
};
