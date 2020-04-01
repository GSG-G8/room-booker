const { clientError, serverError } = require('./error');
const signup = require('./signup');

const login = require('./login');

module.exports = {
  clientError,
  serverError,
  login,
  signup,
};
