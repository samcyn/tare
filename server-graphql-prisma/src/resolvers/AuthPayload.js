/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

function user(root, args, context, info) {
  return context.db.query.user({ where: { id: root.user.id } }, info);
}

module.exports = { user };
