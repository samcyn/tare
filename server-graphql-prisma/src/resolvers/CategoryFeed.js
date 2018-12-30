/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

function categories(parent, args, context, info) {
  return context.db.query.categories({ where: { id_in: parent.categoryIds } }, info);
}

module.exports = {
  categories,
};
