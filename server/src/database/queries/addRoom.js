const connection = require('../config/connection');

const addNewRoom = (name) =>
  connection.query('INSERT INTO room (name) values ($1)', [name]);

const getRoom = (name) =>
  connection.query('SELECT * FROM room  WHERE name = $1 ', [name]);

module.exports = { addNewRoom, getRoom };
