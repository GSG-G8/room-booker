const Joi = require('@hapi/joi');

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com'] },
    })
    .required()
    .pattern(/(\w*@gazaskygeeks.\w*)/),
  password: Joi.string()
    .regex(/[A-z0-9]{6,}/)
    .required(),
});

module.exports = schema;
