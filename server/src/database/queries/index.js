const {
  getRooms,
  addNewRoom,
  getRoom,
  deleteRoomByID,
  patchRoom,
} = require('./room');

const {
  bookRoom,
  getBookingByRoomId,
  getBookingbydate,
  deleteBookingById,
  getBooking,
  getBookingByTimeRange,
} = require('./booking');

const {
  createUser,
  activateUser,
  makeAdmin,
  deleteUserById,
  patchProfile,
} = require('./users');

const {
  getUsers,
  getUserById,
  getUserByEmail: getUser,
  getUserWithPassword,
  checkEmail,
} = require('./userSelect');

module.exports = {
  bookRoom,
  checkEmail,
  addNewRoom,
  getRoom,
  createUser,
  getUsers,
  getUserById,
  getUserWithPassword,
  patchProfile,
  deleteUserById,
  activateUser,
  makeAdmin,
  getBooking,
  deleteBookingById,
  getUser,
  getBookingbydate,
  getRooms,
  getBookingByRoomId,
  getBookingByTimeRange,
  deleteRoomByID,
  patchRoom,
};
