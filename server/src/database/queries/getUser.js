const connection = require('../config/connection');

exports.getUser = (email) =>
  connection.query({
    text: `SELECT * from bookinguser WHERE email=$1;`,
    values: [email],
  });
