const connection = require('../config/connection');

const checkEmail = (email) => {
  const sql = {
    text: 'SELECT * FROM bookinguser WHERE email = $1',
    values: [email],
  };
  return connection.query(sql);
};

module.exports = checkEmail;
