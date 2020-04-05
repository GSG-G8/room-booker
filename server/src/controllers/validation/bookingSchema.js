const Joi = require('@hapi/joi');

module.exports = Joi.object({
  name: Joi.string().alphanum().required(),
  description: Joi.string().required(),
  date: Joi.date().greater('now').required(),
  startHr: Joi.date().timestamp().required(),
  endHr: Joi.date().timestamp().min(Joi.ref('startHr')).required(),
});
