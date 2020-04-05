const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const { activeUser, activeAdmin } = require('../database/queries');

const activateSchema = Joi.object({
  active: Joi.boolean().required(),
  admin: Joi.boolean(),
});

module.exports = (req, res, next) => {
  const { active, admin } = req.body;
  activateSchema
    .validateAsync({ active, admin })
    .then(() => activeUser(req.params.id, active))
    .then(() => {
      if (active === 'true') {
        if (admin) activeAdmin(req.params.id, admin);
      }
    })
    .then(() => res.status(200).end())
    .catch((error) => next(Boom.badRequest(error.message)));
};
