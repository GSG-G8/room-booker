const { clientError, serverError } = require('./error');
const login = require('./login');
const { addRoom } = require('./room');
const signup = require('./signup');
const deleteUser = require('./deleteUser');
const getUsers = require('./getUsers');
const activateAccount = require('./activateAccount');

module.exports = {
  clientError,
  serverError,
  login,
  addRoom,
  signup,
  deleteUser,
  getUsers,
  activateAccount,
};
