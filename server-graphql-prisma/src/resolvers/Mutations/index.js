/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
const { signup, login } = require('./auth');
const {
  createEvent,
  updateEvent,
  upVoteEvent,
  downVoteEvent,
  post,
} = require('./events');
const { createCategory, vote } = require('./category');

module.exports = {
  signup,
  login,
  post,
  vote,
  createEvent,
  updateEvent,
  upVoteEvent,
  downVoteEvent,
  createCategory,
};
