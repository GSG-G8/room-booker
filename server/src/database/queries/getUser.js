const connection = require('../config/connection');

module.exports = (email) =>
  connection.query({
    text: `SELECT id, name, email, is_admin, is_active from bookinguser WHERE email=$1;`,
    values: [email],
  });
