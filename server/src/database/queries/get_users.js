const connection = require('../config/connection');

exports.getUsers = (email) =>
  connection.query({
    text: `SELECT * from bookinguser WHERE email=$1;`,
    values: [email],
  });
