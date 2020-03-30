const connection = require('../config/connection');

exports.getUsers = () =>
  connection.query({
    text: `SELECT * from bookinguser;`,
  });
