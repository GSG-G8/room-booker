const connection = require('../config/connection');

module.exports = () =>
  connection.query({
    text: `SELECT id, name, email, is_admin, is_active, date_created from bookinguser;`,
  });
