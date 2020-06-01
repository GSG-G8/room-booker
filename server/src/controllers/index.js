const { clientError, serverError } = require('./error');
const { signup, login, logout } = require('./auth');
// const login = require('./login');
const { getRBookingbyDate, bookingRoom, deleteBooking } = require('./booking');
// const logout = require('./logout');
const { addRoom, getRooms, patchRoom, deleteRoomById } = require('./room');
const { deleteUser, getUsers, getProfile, patchProfile } = require('./users');
const activateAccount = require('./activateAccount');

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
