const Joi = require('@hapi/joi');

module.exports = Joi.object({
  roomId: Joi.number().required(),
  description: Joi.string().required(),
  startTime: Joi.date().greater('now').required(),
  endTime: Joi.date().greater(Joi.ref('startTime')).required(),
});
