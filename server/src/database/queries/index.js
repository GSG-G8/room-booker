const checkEmail = require('./checkEmail');
const createUser = require('./createUser');
const deleteUser = require('./deleteUserById');
const getUserById = require('./getUserById');
const getUsers = require('./getUsers');
const getUser = require('./getUser');


module.exports = {
  checkEmail,
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  getUser,
};
