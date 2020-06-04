const Joi = require('@hapi/joi');

module.exports = Joi.object({
  active: Joi.boolean(),
  admin: Joi.boolean(),
});
