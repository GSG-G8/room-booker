const connection = require('../config/connection');

module.exports = (user) =>
  connection.query(
    'INSERT INTO BOOKINGUSER(NAME,PASSWORD,EMAIL) values($1,$2,$3)',
    [user.name, user.password, user.email]
  );
