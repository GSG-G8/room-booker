const joi = require('@hapi/joi');

module.exports = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .email()
    .required()
    .pattern(/(\w*@gazaskygeeks.\w*)/),
  password: joi
    .string()
    .regex(/[A-z0-9]{6,}/)
    .required(),
  confirmpassword: joi.ref('password'),
});
