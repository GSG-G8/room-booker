const Joi = require('@hapi/joi');

module.exports = Joi.object({
  roomId: Joi.number().required().messages({
    'number.base': 'roomId should be number',
  }),
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  time: Joi.array()
    .items(
      Joi.object({
        startTime: Joi.date().greater('now').required(),
        endTime: Joi.date().greater(Joi.ref('startTime')).required(),
      })
    )
    .min(1)
    .unique()
    .required()
    .messages({
      'array.base': 'Time must be an array',
      'date.greater': 'Start and end time must be greater than now',
    }),
  remindMe: Joi.boolean().required().messages({
    'boolean.base': 'Remind Me must be a boolean',
  }),
});
