// I N F O - R E S O L V E R
function info() {
  return 'Welcome To Tare API';
}

// F E E D - R E S O L V E R
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
    '{ id }', // I D - A L O N E - I N - S E L E C T I O N - S E T
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
    /*
      SINCE THIS QUERY WAS TO RETURN TYPE FEED,
      LINKIDS  WILL BE RESOLVE FURTHER WITH ANOTHER RESOLVER
    */
  };
}

module.exports = {
  info,
  feed,
};
