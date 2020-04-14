const Joi = require('@hapi/joi');

module.exports = Joi.object({
  daysOfWeek: Joi.array()
    .items(Joi.number().min(1).max(7).required())
    .max(7)
    .unique()
    .required(),
  startTime: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  endTime: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
});
