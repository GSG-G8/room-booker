const Boom = require('@hapi/boom');
const { getBookingbydate } = require('../database/queries');

const bookingSchema = require('./validation/bookingSchema');
// eslint-disable-next-line no-unused-vars
const { getRoom, bookRoom, getBooking } = require('../database/queries');

const bookTime = {
  startHr: '',
  endHr: '',
};

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

  // eslint-disable-next-line no-unused-vars
  const { userID } = req.user;
  bookingSchema
    .validateAsync(bookingData, { abortEarly: false })
    .catch((err) => {
      throw Boom.badRequest(err.details.map((e) => e.message).join('\n'));
    })
    .then(() => getRoom(name))
    .then(({ rows }) => rows[0].id)
    .then((romId) => getBooking(romId))
    .then(({ rows }) =>
      rows
        .sort()
        .map((e) => ({ start_time: e.start_time, end_time: e.end_time }))
    )
    .then((result) => {
      const start = `${req.body.date} ${req.body.startHr}`;
      const end = `${req.body.date} ${req.body.endHr}`;
      bookTime.startHr = result.map((e) => e.start_time);
      bookTime.endHr = result.map((e) => e.end_time);

      // eslint-disable-next-line no-console
      console.log(bookTime, start, end);
    })
    // .then((roomID) =>
    //   bookRoom(
    //     roomID,
    //     userID,
    //     `${date} ${startHr}`,
    //     `${date} ${endHr}`,
    //     description
    //   )
    // )
    // .then(() => res.status(200).json({ message: 'Booking successfully' }))
    .catch(next);
};

module.exports = { getRBookingbyDate, bookingRoom };
