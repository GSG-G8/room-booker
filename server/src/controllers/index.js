const { clientError, serverError } = require('./error');
const login = require('./login');
const { getRBookingbyDate } = require('./booking');
const { addRoom } = require('./room');
const signup = require('./signup');
const deleteUser = require('./deleteUser');
const getUsers = require('./getUsers');
const deleteBooking = require('./deleteBooking');

module.exports = {
  clientError,
  serverError,
  login,
  addRoom,
  signup,
  getRBookingbyDate,
  deleteUser,
  getUsers,
  deleteBooking,
};
