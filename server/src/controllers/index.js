const auth = require('./auth');
const users = require('./users');
const booking = require('./booking');
const room = require('./room');
const error = require('./error');

exports.user = users;
exports.booking = booking;
exports.room = room;
exports.auth = auth;
exports.error = error;
