const Joi = require('@hapi/joi');

const typeSchema = Joi.object({
  category: Joi.string().required(),
  color: Joi.string().required(),
});

module.exports = {
  typeSchema,
};
