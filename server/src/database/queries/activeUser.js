const connection = require('../config/connection');

const activeUser = (id, active) =>
  connection.query('UPDATE bookinguser SET is_active = $1 WHERE id=$2', [
    active,
    id,
  ]);
const activeAdmin = (id, admin) =>
  connection.query('UPDATE bookinguser SET is_admin = $1 WHERE id=$2', [
    admin,
    id,
  ]);
module.exports = { activeUser, activeAdmin };
