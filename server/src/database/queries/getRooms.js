const connection = require('../config/connection');

module.exports = () =>
  connection.query({
    text: `SELECT * from room;`,
  });
