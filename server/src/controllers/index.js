const auth = require('./auth');
const user = require('./user');
const booking = require('./booking');
const room = require('./room');
const error = require('./error');
const businessHours = require('./businessHours');
const bookingTypes = require('./bookingTypes');

exports.user = user;
exports.booking = booking;
exports.room = room;
exports.auth = auth;
exports.error = error;
exports.businessHours = businessHours;
exports.bookingTypes = bookingTypes;
