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
      const promiseArray = [];
      if (active !== undefined) promiseArray.push(activeUser(id, active));
      if (admin !== undefined) promiseArray.push(activeAdmin(id, admin));
      return Promise.all(promiseArray);
    })
    .then(() => res.status(200).end())
    .catch(next);
};
