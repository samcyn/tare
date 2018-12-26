/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

// G E T - A N - E V E N T
async function getEvent(parent, args, context, info) {
  return context.db.query.event(
    {
      where: {
        id: args.eventId,
      },
    },
    info,
  );
}

// A L L - E V E N T S
async function getEvents(parent, args, context) {
  const where = args.filter
    ? {
      OR: [
        { title_contains: args.filter },
        { description_contains: args.filter },
      ],
    }
    : {};

  const queriedEvents = await context.db.query.events(
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
  const eventsConnection = await context.db.query.eventsConnection({}, countSelectionSet);

  // 3
  return {
    count: eventsConnection.aggregate.count,
    eventIds: queriedEvents.map(event => event.id),
    /*
      S I N C E - T H I S - Q U E R Y - W A S - T O - R E T U R N - T Y P E - F E E D,
      E V E N T I D S - W I L L - B E - R E S O L V E
      - F U R T H E R - W I T H - A N O T H E R - R E S O L V E R
    */
  };
}


module.exports = {
  getEvent,
  getEvents,
};
