const checkEmail = require('./checkEmail');
const createUser = require('./createUser');
const getBookingbydate = require('./getBookingbydate');

module.exports = { checkEmail, createUser, getBookingbydate };
const getUserById = require('./getUserById');
const getUsers = require('./getUsers');

module.exports = {
  checkEmail,
  createUser,
  getUsers,
  getUserById,
};
