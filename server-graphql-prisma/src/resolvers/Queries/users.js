/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */


// G E T - A N - E V E N T
async function getUser(parent, args, context, info) {
  if (!args.userId || !args.email) {
    throw new Error('Provide user id or email to run this query');
  }
  const where = args.userId ? { id: args.userId } : { email: args.email };
  return context.db.query.user(
    {
      where,
    },
    info,
  );
}

// A L L - E V E N T S
async function getUsers(parent, args, context) {
  const where = args.filter
    ? {
      OR: [
        { name_contains: args.filter },
        { email_contains: args.filter },
      ],
    }
    : {};

  const queriedUsers = await context.db.query.users(
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
  const usersConnection = await context.db.query.usersConnection({}, countSelectionSet);

  // 3
  return {
    count: usersConnection.aggregate.count,
    userIds: queriedUsers.map(user => user.id),
    /*
      S I N C E - T H I S - Q U E R Y - W A S - T O - R E T U R N - T Y P E - U S E R F E E D,
      U S E R I D S - W I L L - B E - R E S O L V E
      - F U R T H E R - W I T H - A N O T H E R - R E S O L V E R
    */
  };
}


module.exports = {
  getUser,
  getUsers,
};
