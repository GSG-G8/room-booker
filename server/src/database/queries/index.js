const checkEmail = require('./checkEmail');
const { addNewRoom, getRoom } = require('./addRoom');
const createUser = require('./createUser');
const getBookingbydate = require('./getBookingbydate');
const deleteUser = require('./deleteUserById');
const getUserById = require('./getUserById');
const getUserWithPassword = require('./getUserWithPassword');
const patchProfile = require('./patchProfile');
const getUsers = require('./getUsers');

module.exports = {
  checkEmail,
  addNewRoom,
  getRoom,
  createUser,
  getUsers,
  getUserById,
  getUserWithPassword,
  patchProfile,
  deleteUser,
  getBookingbydate,
};
