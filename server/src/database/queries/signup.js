const connection = require('../config/connection');

module.exports = (user) =>
  connection.query(
    'insert into bookinguser(name,password,email) values($1,$2,$3)',
    [user.name, user.password, user.email]
  );
