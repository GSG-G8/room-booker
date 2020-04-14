import Joi from '@hapi/joi';

const logInSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .pattern(/(\w*@gazaskygeeks.\w*)/),
  password: Joi.string()
    .regex(/[A-z0-9]{6,}/)
    .required(),
});

export default logInSchema;
