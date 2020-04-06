/* eslint-disable no-console */
const Boom = require('@hapi/boom');
const { getBookingbydate } = require('../database/queries');

const bookingSchema = require('./validation/bookingSchema');
const {
  getRoom,
  bookRoom,
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

  const { userID } = req.user;
  let roomId = 0;

  bookingSchema
    .validateAsync(bookingData, { abortEarly: false })
    .catch((err) => {
      throw Boom.badRequest(err.details.map((e) => e.message).join('\n'));
    })
    .then(() => getRoom(name))
    .then((room) => {
      roomId = room.rows[0].id;
      if (room.rows.length !== 0) {
        return roomId;
      }
      throw Boom.badRequest('the room you are trying to book does not exist');
    })

    .then((roomID) => getBookingByRoomId(roomID))

    .then(({ rows }) =>
      rows
        .sort()
        .map((e) => ({ start_time: e.start_time, end_time: e.end_time }))
    )

    .then(() => {
      const startTime = `${req.body.date} ${req.body.startHr}`;
      const endTime = `${req.body.date} ${req.body.endHr}`;
      // const bookTime = result.map(
      //   ({ start_time: startTime1, end_time: endTime1 }) => ({
      //     startTime: Date.parse(startTime1),
      //     endTime: Date.parse(endTime1),
      //   })
      // );
      console.log(startTime, endTime, roomId);

      return getBookingByTimeRange({ startTime, endTime, roomId });
    })
    // .then((e) => console.log(e.rows))
    .then(({ rows }) => {
      if (rows.length === 0) {
        return bookRoom(
          roomId,
          userID,
          `${date} ${startHr}`,
          `${date} ${endHr}`,
          description
        );
      }
      throw Boom.badRequest(' not avaliable!!');
    })

    .then(() => res.status(200).json({ message: 'Booking successfully' }))
    .catch(next);
};

module.exports = { getRBookingbyDate, bookingRoom };
