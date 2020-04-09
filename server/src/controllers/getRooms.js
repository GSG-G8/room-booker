const Boom = require('@hapi/boom');
const { getRooms } = require('../database/queries');

module.exports = (req, res, next) => {
  getRooms()
    .then((rooms) => {
      res.json(rooms.rows);
    })
    .catch((error) => {
      next(Boom.badImplementation(error.message));
    });
};
