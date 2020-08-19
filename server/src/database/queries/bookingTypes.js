const connection = require('../config/connection');

const getBookingTypes = () => connection.query('SELECT * FROM bookingtype ');

const patchBookingTypes = (category) =>
  connection.query({
    text: `UPDATE bookingtype SET daysOfWeek=$1 ;`,
    values: [category],
  });
const getBookingTypeID = (category) =>
  connection.query('SELECT * FROM bookingtype  WHERE category = $1 ', [
    category,
  ]);

const deleteBookingTypeByID = (id) =>
  connection.query('DELETE FROM bookingtype WHERE id = $1;', [id]);

module.exports = {
  getBookingTypes,
  patchBookingTypes,
  getBookingTypeID,
  deleteBookingTypeByID,
};
