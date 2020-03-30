const joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const schema = joi.object({
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
module.exports = (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  };

  schema
    .validateAsync(userData, { abortEarly: false })
    .then(() => next())
    .catch((error) =>
      next(Boom.badRequest(error.details.map((e) => e.message).join('\n')))
    );
};
