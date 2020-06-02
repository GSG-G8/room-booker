const Boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const ical = require('ical-generator');
const Moment = require('moment');
const moment = require('../utils/moment-range');

const bookingSchema = require('./validation/bookingSchema');
const {
  bookRoom,
  getBookingByRoomId,
  getUserById,
  getBookingbydate,
  deleteBookingById,
  getBooking,
} = require('../database/queries');
require('env2')('./config.env');

exports.getRBookingbyDate = (req, res, next) => {
  getBookingbydate(req.params.date)
    .then(({ rows }) => {
      if (rows.length === 0) {
        res.json([]);
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

exports.bookingRoom = (req, res, next) => {
  const { roomId, time, title, description, remindMe } = req.body;
  const { userID: userId } = req.user;
  let bookingData = [];
  bookingSchema
    .validateAsync(
      {
        roomId,
        time,
        title,
        description,
        remindMe,
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
      return bookRoom(time, roomId, userId, title, description);
    })
    .then(({ rows }) => {
      bookingData = rows;
      return bookingData;
    })
    .then((result) => res.status(201).json({ newBookings: result }))
    .then(() => {
      if (remindMe) {
        getUserById(userId)
          .then(({ rows }) => ({
            email: rows[0].email,
            name: rows[0].name,
          }))

          // eslint-disable-next-line no-unused-vars
          .then(({ email }) => {
            // email will used in production but right now, it would case problem by nodemailer
            const cal = ical({
              events: bookingData.map((row) => ({
                start: Moment(row.start_time),
                end: Moment(row.end_time),
                summary: row.title,
                description: row.description,
              })),
            }).toString();

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
              },
            });
            const msg = {
              from: `"ROOM BOOKER - Gaza Sky Geeks" <${process.env.EMAIL}>`,
              to: 'linaebe0@gmail.com',
              subject: 'Room booking',
              html: 'here is your room booking',
              icalEvent: {
                filename: 'bookingRoom.ics',
                method: 'request',
                content:
                  'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\nVERSION:2.0\r\n...',
              },
              alternatives: [
                {
                  contentType: 'text/calendar',
                  content: Buffer.from(cal.toString()),
                },
              ],
            };

            transporter.sendMail(msg).catch((error) => {
              throw Boom.badRequest(error);
            });
          });
      }
      return res.end();
    })
    .catch(next);
};
exports.deleteBooking = (req, res, next) => {
  const { id } = req.params;
  const { role } = req.user;

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
      // const userId = result.user_id;
      if (result.user_id === req.user.userID) {
        return deleteBookingById(id);
      }
      throw Boom.forbidden('sorry , you cant delete this booking!!');
    })

    .then(() => res.json({ msg: 'The Booking has delete successfully' }))
    .catch(next);
};
