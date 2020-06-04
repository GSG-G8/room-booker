const connection = require('../config/connection');

exports.deleteUserById = (id) =>
  connection.query({
    text: 'DELETE FROM bookinguser WHERE id = $1',
    values: [id],
  });

exports.createUser = ({ name, password, email }) =>
  connection.query({
    text: 'INSERT INTO bookinguser (name, password, email) values ($1, $2, $3)',
    values: [name, password, email],
  });

exports.patchProfile = (id, name, password) =>
  connection.query({
    text: `UPDATE bookinguser SET name=$2, password=$3 WHERE id=$1 RETURNING id;`,
    values: [id, name, password],
  });

exports.activateUser = (id, active) =>
  connection.query({
    text: 'UPDATE bookinguser SET is_active = $2 WHERE id=$1',
    values: [id, active],
  });

exports.makeAdmin = (id, active) =>
  connection.query({
    text: 'UPDATE bookinguser SET is_admin = $2 WHERE id=$1',
    values: [id, active],
  });
