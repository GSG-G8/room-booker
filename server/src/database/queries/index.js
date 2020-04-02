const checkEmail = require('./checkEmail');
const createUser = require('./createUser');
const deleteUser = require('./deleteUserById');
const getUserById = require('./getUserById');
const getUsers = require('./getUsers');

module.exports = {
  checkEmail,
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};
