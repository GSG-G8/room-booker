const connection = require('../config/connection');

const bookRoom = (roomId, userId, startTime, endTime, description) => {
  const sql = {
    text:
      'INSERT INTO booking (room_id, user_id, start_time, end_time, description) values ($1, $2, $3, $4, $5)',
    values: [roomId, userId, startTime, endTime, description],
  };
  return connection.query(sql);
};

const getBookingByRoomId = (roomId) =>
  connection.query({
    text: `SELECT id, room_id, user_id, start_time, end_time, description from booking WHERE room_id = $1;`,
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

// module.exports = (id, userid, role) => {
//   const sql = {
//     text:
//       'DELETE FROM booking where (id =$1 and (user_id =$2 or ( select is_admin from bookinguser inner join booking on booking.user_id = bookinguser.id )=$3))',

//     values: [id, userid, role],
//   };
//   return connection.query(sql);
// };

module.exports = {
  deleteBookingById,
  getBooking,
  bookRoom,
  getBookingByRoomId,
};
