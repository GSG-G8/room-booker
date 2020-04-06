const connection = require('../config/connection');

const bookRoom = (roomId, userId, startTime, endTime, description) => {
  const sql = {
    text:
      'INSERT INTO booking (room_id, user_id, start_time, end_time, description) values ($1, $2, $3, $4, $5)',
    values: [roomId, userId, startTime, endTime, description],
  };
  return connection.query(sql);
};

const getBooking = (roomId) =>
  connection.query({
    text: `SELECT id, room_id, user_id, start_time, end_time, description from booking WHERE room_id = $1;`,
    values: [roomId],
  });

module.exports = { bookRoom, getBooking };
