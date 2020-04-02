const { clientError, serverError } = require('./error');
const signup = require('./signup');

const login = require('./login');
const { getRBookingbyDate } = require('./booking');

module.exports = {
  clientError,
  serverError,
  login,
  signup,
  getRBookingbyDate,
};
