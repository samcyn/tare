// context here contains the db instance in this case a prisma db...
async function feed(parent, args, context) {
  const where = args.filter
    ? {
      OR: [
        { url_contains: args.filter },
        { description_contains: args.filter },
      ],
    }
    : {};

  const queriedLinks = await context.db.query.links(
    {
      where, skip: args.skip, first: args.first, orderBy: args.orderBy,
    },
    '{ id }',
  );
  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `;
  const linksConnection = await context.db.query.linksConnection({}, countSelectionSet);

  // 3
  return {
    count: linksConnection.aggregate.count,
    linkIds: queriedLinks.map(link => link.id),
  };
}

module.exports = {
  feed,
};
