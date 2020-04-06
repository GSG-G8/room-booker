/* eslint-disable no-console */
const Boom = require('@hapi/boom');
const { getBookingbydate } = require('../database/queries');

const bookingSchema = require('./validation/bookingSchema');
const {
  getRoom,
  // bookRoom,
  getBookingByRoomId,
  getBookingByTimeRange,
} = require('../database/queries');

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
  // body: {
  // bookings: [ { name, description, date, startHr, endHr } , ...]
  // }
  const { name, description, date, startHr, endHr } = req.body;
  const bookingData = { name, description, date, startHr, endHr };

  // const { userID } = req.user;
  bookingSchema
    .validateAsync(bookingData, { abortEarly: false })
    .catch((err) => {
      throw Boom.badRequest(err.details.map((e) => e.message).join('\n'));
    })
    .then(() => getRoom(name))
    .then(({ rows }) => rows[0].id)
    .then((romId) => getBookingByRoomId(romId))
    .then(({ rows }) =>
      rows
        .sort()
        .map((e) => ({ start_time: e.start_time, end_time: e.end_time }))
    )
    .then((result) => {
      console.log(result);
      const startTime = `${req.body.date} ${req.body.startHr}`;
      const endTime = `${req.body.date} ${req.body.endHr}`;
      const bookTime = result.map(
        ({ start_time: startTime1, end_time: endTime1 }) => ({
          startTime: Date.parse(startTime1),
          endTime: Date.parse(endTime1),
        })
      );

      console.log(bookTime, {
        start: Date.parse(startTime),
        end: Date.parse(endTime),
      });
      return getBookingByTimeRange({ startTime, endTime });
    })
    .then(({ rows }) => console.log(rows))
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
