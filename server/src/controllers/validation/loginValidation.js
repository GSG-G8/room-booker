const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

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

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  schema
    .validateAsync({ email, password }, { abortEarly: false })
    .then(() => next())
    .catch((error) =>
      next(Boom.badRequest(error.details.map((e) => e.message).join('\n')))
    );
};
