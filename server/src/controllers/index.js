const { clientError, serverError } = require('./error');
const signup = require('./signup');
const login = require('./login');
const deleteUser = require('./Admin/deleteUser');
const checkAdmin = require('./Admin/checkAdmin ');

module.exports = {
  clientError,
  serverError,
  login,
  signup,
  deleteUser,
  checkAdmin,
};
