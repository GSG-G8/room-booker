const { clientError, serverError } = require('./error');
const { signup, login, logout } = require('./auth');
const { getRBookingbyDate, bookingRoom, deleteBooking } = require('./booking');
const { addRoom, getRooms, patchRoom, deleteRoomById } = require('./room');
const {
  deleteUser,
  getUsers,
  getProfile,
  patchProfile,
  activateAccount,
} = require('./users');

module.exports = {
  clientError,
  serverError,
  login,
  addRoom,
  signup,
  logout,
  getRBookingbyDate,
  deleteUser,
  getUsers,
  activateAccount,
  patchProfile,
  deleteBooking,
  getProfile,
  getRooms,
  deleteRoomById,
  patchRoom,
  bookingRoom,
};
