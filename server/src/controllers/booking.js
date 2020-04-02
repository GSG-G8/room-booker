const { getBookingbydate } = require('../database/queries');

const getRBookingbyDate = (req, res, next) => {
  getBookingbydate(req.params.date)
    .then(({ rows }) => {
      if (rows.length === 0) {
        res.json('no booking rooms for this day');
      } else {
        res.json(rows);
      }
    })
    .catch(next);
};

module.exports = { getRBookingbyDate };
