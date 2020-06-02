const connection = require('../config/connection');

const getRooms = () => connection.query('SELECT * FROM room');

const addNewRoom = (name) =>
  connection.query('INSERT INTO room (name) values ($1)', [name]);

const getRoom = (name) =>
  connection.query('SELECT * FROM room  WHERE name = $1 ', [name]);

const deleteRoomByID = (id) =>
  connection.query('DELETE FROM room WHERE id = $1;', [id]);

const patchRoom = (id, name) =>
  connection.query({
    text: 'UPDATE room SET name=$2 WHERE id=$1 RETURNING id;',
    values: [id, name],
  });

module.exports = { getRooms, addNewRoom, getRoom, deleteRoomByID, patchRoom };
