const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const { activeUser } = require('../database/queries');

const activateSchema = Joi.object({
  admin: Joi.boolean(),
});

module.exports = (req, res, next) => {
  const { admin } = req.body;
  activateSchema
    .validateAsync({ admin })
    .then(() => activeUser(req.params.id, admin || false))
    .then(() => res.status(200).end())
    .catch((error) => next(Boom.badRequest(error.message)));
};
