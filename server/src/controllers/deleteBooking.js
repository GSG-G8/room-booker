const { deleteBookingById } = require('../database/queries');

module.exports = (req, res, next) => {
  const { id } = req.params;
  deleteBookingById(id)
    .then(() => res.json({ msg: 'The Booking has delete successfully' }))
    .catch(next);
};
