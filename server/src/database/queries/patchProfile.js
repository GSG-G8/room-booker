const connection = require('../config/connection');

module.exports = (id, name, password) =>
  connection.query({
    text: `UPDATE bookinguser SET name=$2, password=$3 WHERE id=$1 RETURNING id;`,
    values: [id, name, password],
  });
