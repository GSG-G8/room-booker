const { clientError, serverError } = require('./error');
const signup = require('./signup');
const login = require('./login');
const { getRBookingbyDate, bookingRoom } = require('./booking');
const logout = require('./logout');
const { addRoom } = require('./room');
const deleteUser = require('./deleteUser');
const getUsers = require('./getUsers');
const getRooms = require('./getRooms');
const activateAccount = require('./activateAccount');
const patchProfile = require('./patchProfile');
const deleteBooking = require('./deleteBooking');
const getProfile = require('./getProfile');
const deleteRoomByID = require('./deleteRoomByID');
const patchRoom = require('./patchRoom');

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
  bookingRoom,
  deleteRoomByID,
  patchRoom,
};
