const Boom = require('@hapi/boom');
const { deleteBookingById, getBooking } = require('../database/queries');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { userID, role } = req.user;

  getBooking(id)
    .then(({ rows }) => {
      if (rows.length !== 0) {
        return rows[0];
      }
      throw Boom.badRequest(
        'the booking you are trying to delete does not exist'
      );
    })
    .then((result) => {
      if (role) {
        return deleteBookingById(id);
      }
      const userId = result.user_id;
      if (userId === userID) {
        return deleteBookingById(id);
      }
      throw Boom.forbidden('sorry , you cant delete this booking!!');
    })

    .then(() => res.json({ msg: 'The Booking has delete successfully' }))
    .catch(next);
};
