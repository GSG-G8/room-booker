const Boom = require('@hapi/boom');

const { getBookingTypes } = require('../database/queries');

exports.getTypes = (req, res, next) => {
  getBookingTypes()
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((error) => {
      next(Boom.badImplementation(error.message));
    });
};
