const {
  getRooms,
  addNewRoom,
  getRoom,
  deleteRoomByID,
  patchRoom,
} = require('./addRoom');

const {
  deleteBookingById,
  getBooking,
  bookRoom,
  getBookingByRoomId,
  getBookingByTimeRange,
  getBookingbydate,
} = require('./booking');

const {
  createUser,
  activateUser,
  makeAdmin,
  deleteUser,
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
  checkEmail,
  addNewRoom,
  getRoom,
  createUser,
  getUsers,
  getUserById,
  getUserWithPassword,
  patchProfile,
  deleteUser,
  activateUser,
  makeAdmin,
  getBooking,
  deleteBookingById,
  getUser,
  getBookingbydate,
  getRooms,
  bookRoom,
  getBookingByRoomId,
  getBookingByTimeRange,
  deleteRoomByID,
  patchRoom,
};
