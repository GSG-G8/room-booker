const Joi = require('@hapi/joi');

module.exports = Joi.object({
  roomId: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string(),
  time: Joi.array()
    .items(
      Joi.object({
        startTime: Joi.date().greater('now').required(),
        endTime: Joi.date().greater(Joi.ref('startTime')).required(),
      })
    )
    .min(1)
    .unique()
    .required(),
  remindMe: Joi.boolean().required(),
});
