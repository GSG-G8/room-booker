const { clientError, serverError } = require('./error');
const login = require('./login');
const { getRBookingbyDate, bookingRoom } = require('./booking');
const { addRoom } = require('./room');
const signup = require('./signup');
const deleteUser = require('./deleteUser');
const getUsers = require('./getUsers');
const getProfile = require('./getProfile');

module.exports = {
  clientError,
  serverError,
  login,
  addRoom,
  signup,
  getRBookingbyDate,
  deleteUser,
  getUsers,
  getProfile,
  bookingRoom,
};
