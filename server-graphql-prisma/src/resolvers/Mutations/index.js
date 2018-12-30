/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
const {
  signup,
  login,
  updateUser,
  deleteUser,
} = require('./auth');
const {
  createEvent,
  updateEvent,
  deleteEvent,
  upVoteEvent,
  downVoteEvent,
} = require('./events');
const {
  createCategory,
  updateCategory,
  deleteCategory,
} = require('./category');

module.exports = {
  signup,
  login,
  updateUser,
  deleteUser,
  createEvent,
  updateEvent,
  deleteEvent,
  upVoteEvent,
  downVoteEvent,
  createCategory,
  updateCategory,
  deleteCategory,
};
