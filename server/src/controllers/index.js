const { clientError, serverError } = require('./error');
const signup = require('./signup');
const login = require('./login');
const deleteUser = require('./deleteUser');
const getUsers = require('./getUsers');

module.exports = {
  clientError,
  serverError,
  login,
  signup,
  deleteUser,
  getUsers,
};
