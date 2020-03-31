const connection = require('../config/connection');

const checkEmail = (email) => {
  const sql = {
    text: 'select * from bookinguser where email = $1',
    values: [email],
  };
  return connection.query(sql);
};

module.exports = checkEmail;
