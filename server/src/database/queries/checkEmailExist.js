const connection = require('../config/connection');

module.exports = (email) => {
  const sql = {
    text: 'SELECT * FROM BOOKINGUSER WHERE EMAIL = $1',
    values: [email],
  };
  return connection.query(sql);
};
