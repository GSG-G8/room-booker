const connection = require('../config/connection');

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
module.exports = { deleteBookingById, getBooking };
