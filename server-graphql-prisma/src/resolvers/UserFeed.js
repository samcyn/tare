/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

function users(parent, args, context, info) {
  return context.db.query.users({ where: { id_in: parent.userIds } }, info);
}

module.exports = {
  users,
};
