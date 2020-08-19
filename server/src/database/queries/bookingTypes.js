const connection = require('../config/connection');

const getBookingTypes = () => connection.query('SELECT * FROM bookingtype ');

const addType = (category, color) =>
  connection.query(
    'INSERT INTO bookingtype (category, color) values ($1, $2)',
    [category, color]
  );

const patchBookingTypes = (category, color) =>
  connection.query({
    text: `UPDATE bookingtype SET category=$1 ,color=$2;`,
    values: [category, color],
  });
const getBookingTypeByCat = (category) =>
  connection.query('SELECT * FROM bookingtype  WHERE category = $1 ', [
    category,
  ]);

const deleteBookingTypeByID = (id) =>
  connection.query('DELETE FROM bookingtype WHERE id = $1;', [id]);

module.exports = {
  getBookingTypes,
  addType,
  patchBookingTypes,
  getBookingTypeByCat,
  deleteBookingTypeByID,
};
