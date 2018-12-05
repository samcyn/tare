/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const info = require('./info');

const {
  getUser,
  getUsers,
} = require('./users');

const {
  getEvent,
  getEvents,
} = require('./events');

const {
  getCategory,
  getCategories,
} = require('./categories');

module.exports = {
  info,
  getUser,
  getUsers,
  getEvent,
  getEvents,
  getCategory,
  getCategories,
};
