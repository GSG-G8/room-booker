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
  arrOfIntervals.filter((existingInterval) =>
    existingInterval.overlaps(interval)
  );

const bookingRoom = (req, res, next) => {
  const { roomId, time, description } = req.body;

  const { userID: userId } = req.user;

  bookingSchema
    .validateAsync(
      {
        roomId,
        time,
        description,
      },
      { abortEarly: false }
    )
    .catch((err) => {
      throw Boom.badRequest(err.details.map((e) => e.message).join('\n'));
    })
    .then(() =>
      time.map(({ startTime: time1, endTime: time2 }) =>
        moment.range(time1, time2)
      )
    )
    .then((intervals) =>
      intervals
        .map((e) =>
          checkOverlap(
            intervals.filter((v) => v !== e),
            e
          )
        )
        .flat()
    )
    .then((overlaps) => {
      if (overlaps.length)
        throw Boom.badRequest('your bookings are overlaping', overlaps);
      return getBookingByRoomId(roomId);
    })
    .then(({ rows }) =>
      // transform all those existing bookings to moment-range intervals
      rows.map(({ start_time: existingStartTime, end_time: existingEndTime }) =>
        moment.range(existingStartTime, existingEndTime)
      )
    )
    .then((arrOfIntervals) =>
      // check all new bookings intervals if they overlap
      time
        .map(({ startTime, endTime }) =>
          checkOverlap(arrOfIntervals, moment.range(startTime, endTime))
        )
        .flat()
    )
    .then((overlapsArr) => {
      if (overlapsArr.length)
        throw Boom.badRequest(
          'Other bookings already exist in the requested interval',
          overlapsArr
        );
      return bookRoom(time, roomId, userId, description);
    })
    .then(({ rows }) => {
      res.status(201).json({ newBookings: rows });
    })
    .catch(next);
};
module.exports = { getRBookingbyDate, bookingRoom };
