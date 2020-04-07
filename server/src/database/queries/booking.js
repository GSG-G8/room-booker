const connection = require('../config/connection');

const bookRoom = (roomId, userId, startTime, endTime, description) => {
  const sql = {
    text:
      'INSERT INTO booking (room_id, user_id, start_time, end_time, description) values ($1, $2, $3, $4, $5) RETURNING *',
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

// select *
//   from foo
//  where (date > lower_date and date < upper_date) -- technically this clause isn't needed if they are a day apart
//     or (date = lower_date and time >= lower_time)
//     or (date = upper_date and time <= upper_time)

const getBookingByTimeRange = ({ startTime, endTime, roomId }) => {
  /* SELECT time,
  close 
  FROM intraday_values 
   between date="2005-03-01" 
   and time="15:30" 
   and date="2005-03-02" 
  //  and time = "15:14" current_timestamp 
*/

  const sql = {
    text: `SELECT * FROM booking WHERE $1 >= booking.start_time
  AND $2 >= booking.end_time AND room_id = $3`,
    values: [startTime, endTime, roomId],
  };
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
  getBookingByTimeRange,
};
