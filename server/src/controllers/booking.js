/* eslint-disable no-console */
const Boom = require('@hapi/boom');
const moment = require('../utils/moment-range');
const { getBookingbydate } = require('../database/queries');
const bookingSchema = require('./validation/bookingSchema');
const { bookRoom, getBookingByRoomId } = require('../database/queries');

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

const checkOverlap = (arrOfIntervals, interval) =>
  arrOfIntervals.filter(({ interval: existingInterval }) =>
    existingInterval.overlaps(interval)
  );

const bookingRoom = (req, res, next) => {
  const { roomId, description, startTime, endTime } = req.body;
  const { userID } = req.user;

  const newBookingInterval = moment.range(startTime, endTime);

  bookingSchema
    .validateAsync(
      {
        roomId,
        description,
        startTime,
        endTime,
      },
      { abortEarly: false }
    )
    .catch((err) => {
      throw Boom.badRequest(err.details.map((e) => e.message).join('\n'));
    })
    .then(() => getBookingByRoomId(roomId))
    .then(({ rows }) =>
      rows.map(
        ({
          start_time: existingStartTime,
          end_time: existingEndTime,
          ...rest
        }) => ({
          interval: moment.range(existingStartTime, existingEndTime),
          ...rest,
        })
      )
    )
    .then((arrOfIntervals) => checkOverlap(arrOfIntervals, newBookingInterval))
    .then((overlapsArr) => {
      if (overlapsArr.length)
        throw Boom.badRequest(
          'Other bookings already exist in the requested interval',
          overlapsArr
        );
      return bookRoom(roomId, userID, startTime, endTime, description);
    })
    .then(({ rows: [newBooking] }) => {
      res.status(201).json({ ...newBooking });
    })
    .catch(next);
};
module.exports = { getRBookingbyDate, bookingRoom };
