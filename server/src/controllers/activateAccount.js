const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const { activeUser, activeAdmin } = require('../database/queries');

const activateSchema = Joi.object({
  active: Joi.boolean(),
  admin: Joi.boolean(),
});

module.exports = (req, res, next) => {
  const active = req.body.active === 'true';
  const { admin } = req.body;
  const { id } = req.params;

  activateSchema
    .validateAsync({ active, admin })
    .catch((error) => {
      throw Boom.badRequest(error.message);
    })
    .then(() => {
      if (active !== undefined) activeUser(id, active);
      if (admin !== undefined) activeAdmin(id, admin);
    })
    .then(() => res.status(200).end())
    .catch(next);
};
