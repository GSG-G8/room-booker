const checkEmail = require('./checkEmail');
const { addNewRoom, getRoom } = require('./addRoom');
const createUser = require('./createUser');
const deleteUser = require('./deleteUserById');
const getUserById = require('./getUserById');
const getUsers = require('./getUsers');
const deleteBookingById = require('./deleteBookingById');

module.exports = {
  checkEmail,
  addNewRoom,
  getRoom,
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  deleteBookingById,
};
