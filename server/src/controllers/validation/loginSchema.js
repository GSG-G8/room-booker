const Joi = require('@hapi/joi');

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com'] },
    })
    .required()
    .pattern(/(\w*@gazaskygeeks.\w*)/)
    .messages({
      'string.empty': `email is a required field`,
      'string.pattern.base': 'email domain should be gazaskygeeks',
    }),
  password: Joi.string()
    .regex(/[A-z0-9]{6,}/)
    .required()
    .messages({
      'string.empty': `Password is a required field`,
      'string.pattern.base':
        'Your password has to be at least six characters or numbers',
    }),
});

module.exports = schema;
