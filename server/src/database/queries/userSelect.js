const connection = require('../config/connection');

exports.getUsers = () =>
  connection.query({
    text: `SELECT id, name, email, is_admin, is_active, date_created
        FROM bookinguser ORDER BY id;`,
  });

exports.getUserById = (id) =>
  connection.query({
    text: `SELECT id, name, email, is_admin, is_active, date_created
        FROM bookinguser WHERE id=$1;`,
    values: [id],
  });

exports.getUserByEmail = (email) =>
  connection.query({
    text: `SELECT id, name, email, is_admin, is_active
        FROM bookinguser WHERE email=$1;`,
    values: [email],
  });

exports.getUserWithPassword = (id) =>
  connection.query({
    text: `SELECT id, name, email, is_admin, is_active, date_created, password
        FROM bookinguser WHERE id=$1;`,
    values: [id],
  });

exports.checkEmail = (email) =>
  connection.query({
    text: 'SELECT * FROM bookinguser WHERE email = $1',
    values: [email],
  });
