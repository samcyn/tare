/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

// G E T - A - C A T E G O R I E S
async function getCategory(parent, args, context, info) {
  if (!args.categoryId || !args.title) {
    throw new Error('Provide categoryId or title to run this query');
  }

  const where = args.categoryId ? { id: args.categoryId } : { title: args.title };
  return context.db.query.category(
    {
      where,
    },
    info,
  );
}

// G E T - A L L - C A T E G O R I E S
async function getCategories(parent, args, context) {
  const where = args.filter
    ? {
      OR: [
        { title_contains: args.filter },
      ],
    }
    : {};

  const queriedCategories = await context.db.query.categories(
    {
      where, skip: args.skip, first: args.first, orderBy: args.orderBy,
    },
    '{ id }', // I D - A L O N E - I N - S E L E C T I O N - S E T
  );
  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `;
  const categoriesConnection = await context.db.query.categoriesConnection({}, countSelectionSet);

  // 3
  return {
    count: categoriesConnection.aggregate.count,
    categoryIds: queriedCategories.map(category => category.id),
    /*
      S I N C E - T H I S - Q U E R Y - W A S - T O - R E T U R N - T Y P E -
      C A T E G O R Y F E E D, C A T E G O R Y I D S - W I L L - B E - R E S O L V E
      - F U R T H E R - W I T H - A N O T H E R - R E S O L V E R
    */
  };
}


module.exports = {
  getCategory,
  getCategories,
};
