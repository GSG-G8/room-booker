const connection = require('../config/connection');

const addRoom = (name) =>
  connection.query('INSERT INTO room VAlUES = $1', [name]);

module.exports = addRoom;
