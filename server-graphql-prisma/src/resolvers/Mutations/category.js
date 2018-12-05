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

async function vote(parent, args, context, info) {
  const userId = getUserId(context);

  const linkExists = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: args.linkId },
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
      },
    },
    info,
  );
}

module.exports = {
  createCategory,
  vote,
};
