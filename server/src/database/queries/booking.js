const connection = require('../config/connection');

const bookRoom = (
  bookings,
  roomId,
  bookingTypeId,
  userId,
  title,
  description,
  noOfPeople
) => {
  const values = bookings
    .map(
      ({ startTime, endTime }) =>
        `(${roomId}, ${userId}, ${bookingTypeId},'${startTime}', '${endTime}', '${title}', '${description}','${noOfPeople}')`
    )
    .join(',');

  const sql = `INSERT INTO booking
    (room_id, user_id, bookingtype_id, start_time, end_time, title ,description,noOfPeople)
    VALUES ${values} RETURNING *`;

  return connection.query(sql);
};

const getBookingByRoomId = (roomId) =>
  connection.query({
    text: `SELECT id, room_id, bookingtype_id, user_id, start_time, end_time, description,noOfPeople from
      booking WHERE room_id = $1 AND start_time > CURRENT_TIMESTAMP ;`,
    values: [roomId],
  });
const deleteBookingById = (id) => {
  const sql = {
    text: 'DELETE FROM booking where id = $1',
    values: [id],
  };
  return connection.query(sql);
};

const getBooking = (id) => {
  const sql = { text: 'SELECT * FROM booking  WHERE id = $1', values: [id] };
  return connection.query(sql);
};

const getBookingByTimeRange = ({ startTime, endTime, roomId }) => {
  const now = new Date();
  const sql = {
    text: `SELECT * FROM booking WHERE $1 >= booking.start_time
  AND $2 >= booking.end_time AND room_id = $3 AND booking.start_time >= $4 `,
    values: [startTime, endTime, roomId, now],
  };
  return connection.query(sql);
};

const getBookingbydate = (date) => {
  const day = new Date(date);
  day.setDate(day.getDate() + 1); // get the next day
  return connection.query(
    'SELECT B.id, B.room_id, B.user_id,B.bookingtype_id, T.color, B.start_time, B.end_time, B.title, B.description,B.noOfPeople, U.name FROM booking B INNER JOIN bookinguser U ON U.id = B.user_id INNER JOIN bookingtype T ON T.id = B.bookingtype_id  WHERE B.start_time >= $1 AND B.end_time < $2',
    [date, day]
  );
};

module.exports = {
  deleteBookingById,
  getBooking,
  bookRoom,
  getBookingByRoomId,
  getBookingByTimeRange,
  getBookingbydate,
};
