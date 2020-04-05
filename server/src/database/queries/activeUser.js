const connection = require('../config/connection');

const activeUser = (id, admin) =>
  connection.query(
    'UPDATE bookinguser SET is_active = true, is_admin =$1 WHERE id=$2',
    [admin, id]
  );

module.exports = activeUser;
