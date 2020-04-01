const { clientError, serverError } = require('./error');
const login = require('./login');
const { addRoom } = require('./room');
const signup = require('./signup');

module.exports = {
  clientError,
  serverError,
  login,
  addRoom,
  signup,
};
