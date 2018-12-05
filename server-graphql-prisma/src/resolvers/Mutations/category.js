/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const { getUserId } = require('../../utils/authenticated');

async function createCategory(parent, args, context, info) {
  // G E T - T H E - U S E R - I D
  const userId = getUserId(context);

  // MA K E - S U R E - T I T L E - I S - T R I M M E D - A N D - L O W E R C A S E
  const title = args.title.trim().toLowerCase();

  /* C R E A T E - N E W - C A T E G O R Y - A N D
  - C O N N E C T - A L L - R E L A T I O N S H I P S */
  return context.db.mutation.createCategory(
    {
      data: {
        title,
        _creator: { connect: { id: userId } },
      },
    }, info,
  );
}

async function updateCategory(parent, args, context, info) {
  // G E T - T H E - U S E R - I D
  const userId = getUserId(context);

  // V E R I F Y - C A T E G O R Y - C R E A T O R
  const categoryOwnerExist = await context.db.exists.Category({
    _creator: { id: userId },
    id: args.categoryId,
  });

  // I F - C R E A T O R - I S - N O T - F O U N D
  if (!categoryOwnerExist) {
    throw new Error('Can\'t update someone else CATEGORY');
  }

  // MA K E - S U R E - T I T L E - I S - T R I M M E D - A N D - L O W E R C A S E
  const title = args.title.trim().toLowerCase();

  return context.db.mutation.updateCategory(
    {
      data: {
        title,
      },
      where: {
        id: args.categoryId,
      },
    }, info,
  );
}

async function deleteCategory(parent, args, context, info) {
  // G E T - T H E - U S E R - I D
  const userId = getUserId(context);

  // V E R I F Y - C A T E G O R Y - C R E A T O R
  const categoryOwnerExist = await context.db.exists.Category({
    _creator: { id: userId },
    id: args.categoryId,
  });

  // I F - C R E A T O R - I S - N O T - F O U N D
  if (!categoryOwnerExist) {
    throw new Error('Can\'t delete someone else CATEGORY');
  }

  return context.db.mutation.deleteCategory(
    {
      where: {
        id: args.categoryId,
      },
    }, info,
  );
}
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};
