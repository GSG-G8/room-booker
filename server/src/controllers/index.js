const { clientError, serverError } = require('./error');
const signup = require('./signup');

const login = require('./login');
const getUsers = require('./getUsers');

module.exports = {
  clientError,
  serverError,
  login,
  signup,
  getUsers,
};
