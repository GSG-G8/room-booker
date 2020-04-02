const { clientError, serverError } = require('./error');
const signup = require('./signup');
const login = require('./login');
const { getRBookingbyDate } = require('./booking');
const deleteUser = require('./deleteUser');
const getUsers = require('./getUsers');

module.exports = {
  clientError,
  serverError,
  login,
  signup,
  getRBookingbyDate,
  deleteUser,
  getUsers,
};
