const { clientError, serverError } = require('./error');
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const { addRoom } = require('./room');
const deleteUser = require('./deleteUser');
const getUsers = require('./getUsers');

module.exports = {
  clientError,
  serverError,
  login,
  addRoom,
  signup,
  logout,
  deleteUser,
  getUsers,
};
