const connection = require('../config/connection');

module.exports = (date) => {
  const day = new Date(date);
  day.setDate(day.getDate() + 1); // get the next day
  return connection.query(
    'SELECT * FROM booking WHERE start_time >= $1 AND end_time < $2',
    [date, day]
  );
};
