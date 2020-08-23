const Boom = require('@hapi/boom');
const { typeSchema } = require('./validation/bookingTypeSchema');

const {
  getBookingTypes,
  addType,
  getBookingTypeByCat,
  patchBookingTypes,
  deleteBookingTypeByID,
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

exports.patchType = (req, res, next) => {
  const { id } = req.params;
  const { category, color } = req.body;
  typeSchema
    .validateAsync({ category, color })
    .catch((error) => {
      throw Boom.badRequest(error.message);
    })
    .then(() => patchBookingTypes(category, color, id))
    .then(({ rows }) => {
      if (rows.length !== 0) {
        res.status(200).json('type has been updated successfully');
      } else {
        throw Boom.notFound(`booking type doesn't exist`);
      }
    })
    .catch(next);
};

exports.deleteType = (req, res, next) => {
  const { id } = req.params;
  deleteBookingTypeByID(id)
    .then(() => res.json('booking type deleted successfully'))
    .catch(next);
};
