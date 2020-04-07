const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const { activateUser, makeAdmin } = require('../database/queries');

const activateSchema = Joi.object({
  active: Joi.boolean(),
  admin: Joi.boolean(),
});

module.exports = (req, res, next) => {
  const { admin, active } = req.body;
  const { id } = req.params;

  activateSchema
    .validateAsync({ active, admin })
    .catch((error) => {
      throw Boom.badRequest(error.message);
    })
    .then(() => {
      const promiseArray = [];
      if (active !== undefined) promiseArray.push(activateUser(id, active));
      if (admin !== undefined) promiseArray.push(makeAdmin(id, admin));
      return Promise.all(promiseArray);
    })
    .then(() => res.status(200).end())
    .catch(next);
};
