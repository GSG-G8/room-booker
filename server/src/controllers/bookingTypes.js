const Boom = require('@hapi/boom');
const { typeSchema } = require('./validation/bookingTypeSchema');

const {
  getBookingTypes,
  addType,
  getBookingTypeByCat,
} = require('../database/queries');

exports.getTypes = (req, res, next) => {
  getBookingTypes()
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((error) => {
      next(Boom.badImplementation(error.message));
    });
};

exports.addType = (req, res, next) => {
  const { category, color } = req.body;
  typeSchema
    .validateAsync({ category, color })
    .catch((error) => {
      throw Boom.badRequest(error.message);
    })
    .then(() => getBookingTypeByCat(category))
    .then(({ rows }) => {
      if (rows.length === 0) {
        return addType(category, color);
      }
      throw Boom.badRequest(`${category} already exist`);
    })
    .then(() => res.status(201).json(`${category} type added successfully`))

    .catch(next);
};
