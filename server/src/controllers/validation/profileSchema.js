const Joi = require('@hapi/joi');

module.exports = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .messages({
      'string.pattern.base':
        'Your password has to be at least six characters or numbers',
    }),
});
