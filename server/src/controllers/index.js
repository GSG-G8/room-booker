const { clientError, serverError } = require('./error');
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');

module.exports = {
  clientError,
  serverError,
  login,
  signup,
  logout,
};
