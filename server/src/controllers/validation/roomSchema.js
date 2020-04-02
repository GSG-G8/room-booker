const Joi = require('@hapi/joi');

const roomSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  roomSchema,
};
