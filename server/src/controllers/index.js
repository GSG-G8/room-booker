const { clientError, serverError } = require('./error');
const login = require('./login');
const { addRoom } = require('./room');

module.exports = {
  clientError,
  serverError,
  login,
  addRoom,
};
