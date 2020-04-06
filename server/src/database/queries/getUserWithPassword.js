const connection = require('../config/connection');

module.exports = (id) =>
  connection.query({
    text: `SELECT * from bookinguser WHERE id=$1;`,
    values: [id],
  });
