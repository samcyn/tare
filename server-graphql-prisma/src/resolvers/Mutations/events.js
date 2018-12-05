/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
const { getUserId } = require('../../utils/authenticated');
const { processUpload } = require('../../utils/upload');

function post(parent, args, context, info) {
  // get user id when user wants to post link...
  const userId = getUserId(context);
  return context.db.mutation.createLink(
    {
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      },
    },
    info,
  );
}

async function createEvent(parent, args, context, info) {
  let newFile;
  // G E T - T H E - U S E R - I D
  const userId = getUserId(context);
  // C H E C K - T O - S E E - I F - C A T E G O R Y - E X I S T
  const cateoryExists = await context.db.exists.Category({
    id: args.categoryId,
  });
  // I F - N O T - T H R O W - E R R O R
  if (!cateoryExists) {
    throw new Error('Category does not exist');
  }

  if (args.file) {
    // P R O C E S S - U P L O A D E D - I M A G E (S)
    const { filename, mimetype, encoding } = processUpload(args.file);

    // C R E A T E - N E W - F I L E - T Y P E - S E L E C T I N G - O N L Y - T H E - I D
    newFile = await context.db.mutation.createFile({
      data: {
        filename,
        mimetype,
        encoding,
      },
    }, 'id');
  }

  const {
    title, description, duration, location, categoryId,
  } = args;
  // C R E A T E - N E W - E V E N T - A N D - C O N N E C T - A L L - R E L A T I O N S H I P S
  return context.db.mutation.createEvent(
    {
      data: {
        title,
        description,
        duration,
        location,
        imageFile: newFile ? { connect: { id: newFile.id } } : {},
        _creator: { connect: { id: userId } },
        _category: { connect: { id: categoryId } },
      },
    }, info,
  );
}

async function updateEvent(parent, args, context, info) {
  let newFile;
  // G E T - T H E - U S E R - I D
  const userId = getUserId(context);

  // V E R I F Y - E V E N T - C R E A T O R
  const eventOwnerExist = await context.db.exists.Event({
    _creator: { id: userId },
    id: args.eventId,
  });
  // I F - C R E A T O R - I S - N O T - F O U N D
  if (!eventOwnerExist) {
    throw new Error('Can\'t update someone else event');
  }
  // C H E C K - T O - S E E - I F - C A T E G O R Y - E X I S T
  const categoryExists = await context.db.exists.Category({
    id: args.categoryId,
  });
  // I F - N O T - T H R O W - E R R O R
  if (!categoryExists) {
    throw new Error('Category does not exist');
  }

  if (args.file) {
    // P R O C E S S - U P L O A D E D - I M A G E (S)
    const { filename, mimetype, encoding } = processUpload(args.file);

    // C R E A T E - N E W - F I L E - T Y P E - S E L E C T I N G - O N L Y - T H E - I D
    newFile = await context.db.mutation.createFile({
      data: {
        filename,
        mimetype,
        encoding,
      },
    }, 'id');
  }

  const {
    title, description, duration, location, categoryId,
  } = args;
  // C R E A T E - N E W - E V E N T - A N D - C O N N E C T - A L L - R E L A T I O N S H I P S
  return context.db.mutation.createEvent(
    {
      data: {
        title,
        description,
        duration,
        location,
        imageFile: newFile ? { connect: { id: newFile.id } } : {},
        _creator: { connect: { id: userId } },
        _category: { connect: { id: categoryId } },
      },
    }, info,
  );
}

async function upVoteEvent(parent, args, context, info) {
  const userId = getUserId(context);

  const alreadyUpVotedEvent = await context.db.exists.Like({
    _creator: { id: userId },
    _event: { id: args.eventId },
  });

  if (alreadyUpVotedEvent) {
    throw new Error(`Already voted for event: ${args.eventId}`);
  }

  return context.db.mutation.createLike(
    {
      data: {
        _creator: { connect: { id: userId } },
        _event: { connect: { id: args.eventId } },
      },
    },
    info,
  );
}

async function downVoteEvent(parent, args, context, info) {
  const userId = getUserId(context);

  const alreadyDownVotedEvent = await context.db.exists.Like({
    _creator: { id: userId },
    _event: { id: args.eventId },
  });

  if (alreadyDownVotedEvent) {
    const like = await context.db.query.likes({
      where: { _creator: { id_contains: userId }, _event: { id_contains: args.eventId } },
    }, '{ id }');

    if (like && like[0]) {
      const likeId = like[0].id;
      return context.db.mutation.deleteLike({ where: { id: likeId } }, info);
    }
  }

  return context.db.mutation.createLike(
    {
      data: {
        _creator: { connect: { id: userId } },
        _event: { connect: { id: args.eventId } },
      },
    },
    info,
  );
}

module.exports = {
  post,
  createEvent,
  updateEvent,
  upVoteEvent,
  downVoteEvent,
};
