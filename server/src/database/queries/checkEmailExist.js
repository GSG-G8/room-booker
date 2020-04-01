const connection = require('../config/connection');

module.exports = (email) => {
  const sql = {
    text: 'SELECT * FROM bookinguser WHERE email = $1',
    values: [email],
  };
  return connection.query(sql);
};
