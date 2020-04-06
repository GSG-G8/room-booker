const Joi = require('@hapi/joi');

module.exports = Joi.object({
  name: Joi.string().alphanum().required(),
  description: Joi.string().required(),
  date: Joi.date().greater('now').required(),
  startHr: Joi.string().required(),
  endHr: Joi.string().required(),
});
