const connection = require('../config/connection');

module.exports = (id) =>
  connection.query({
    text: `SELECT id, name, email, is_admin, is_active, date_created from bookinguser WHERE id=$1;`,
    values: [id],
  });
