const connection = require('../config/connection');

module.exports = (id) => {
  const sql = {
    text: 'DELETE FROM bookinguser WHERE id = $1',
    values: [id],
  };
  return connection.query(sql);
};
