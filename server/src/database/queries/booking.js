const connection = require('../config/connection');

const bookRoom = (bookings, roomId,  bookingTypeId, userId, title, description, noOfPeople) => {
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
    'SELECT booking.id, booking.room_id, booking.user_id,booking.bookingtype_id, booking.start_time, booking.end_time, booking.title, booking.description,booking.noOfPeople, bookinguser.name FROM booking INNER JOIN bookinguser ON bookinguser.id = booking.user_id WHERE booking.start_time >= $1 AND booking.end_time < $2',
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
