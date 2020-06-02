const connection = require('../config/connection');

module.exports = () =>
  connection.query({
    text: `SELECT * FROM room ORDER BY id;`,
  });
