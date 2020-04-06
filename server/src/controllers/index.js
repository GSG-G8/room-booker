const { clientError, serverError } = require('./error');
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const { getRBookingbyDate } = require('./booking');
const { addRoom } = require('./room');
const deleteUser = require('./deleteUser');
const getUsers = require('./getUsers');
const patchProfile = require('./patchProfile');
const deleteBooking = require('./deleteBooking');
const getProfile = require('./getProfile');

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
  patchProfile,
  deleteBooking,
  getProfile,
};
