const joi = require('@hapi/joi');

module.exports = joi.object({
  name: joi.string().required().messages({
    'string.empty': `name is a required field`,
  }),
  email: joi
    .string()
    .email()
    .required()
    .pattern(/(\w*@gazaskygeeks.\w*)/)
    .messages({
      'string.empty': `email is a required field`,
      'string.pattern.base': 'email domain should be gazaskygeeks',
    }),
  password: joi
    .string()
    .regex(/[A-z0-9]{6,}/)
    .required()
    .messages({
      'string.empty': `Password is a required field`,
      'string.pattern.base':
        'Your password has to be at least six characters or numbers',
    }),
  confirmpassword: joi.ref('password'),
});
