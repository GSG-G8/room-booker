const Boom = require('@hapi/boom');
const { getBookingbydate } = require('../database/queries');

const bookingSchema = require('./validation/bookingSchema');
const { getRoom, bookRoom } = require('../database/queries');

const getRBookingbyDate = (req, res, next) => {
  getBookingbydate(req.params.date)
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw Boom.notFound('no booking rooms for this day');
      } else {
        res.json(rows);
      }
    })
    .catch(next);
};
const bookingRoom = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { name, description, date, startHr, endHr } = req.body;
  const bookingData = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    startHr: req.body.startHr,
    endHr: req.body.endHr,
  };

  const { userID } = req.user;
  bookingSchema
    .validateAsync(bookingData, { abortEarly: false })
    .catch((err) => {
      throw Boom.badRequest(err.details.map((e) => e.message).join('\n'));
    })
    .then(() => getRoom(name))
    .then(({ rows }) => rows[0].id)
    .then((roomID) => bookRoom(roomID, userID, startHr, endHr, description))
    .catch(next);
};

// // 1465599344356 timestamp
// console.log('date herreeeee', Date.parse('08 Dec 2020 00:12:00'));
// console.log('date herreeeee', Date.parse('08 Dec 2020 01:12:00'));
// Date.parse('08 Dec 2020 00:12:00 GMT');
// var datum = new Date(Date.UTC('2009','01','13','23','31','30'));
// return datum.getTime()/1000;

module.exports = { getRBookingbyDate, bookingRoom };
