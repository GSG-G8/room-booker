const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const schema = require('./validation/signupSchema');
const { checkEmail, createUser } = require('../database/queries');

module.exports = (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  };
  schema
    .validateAsync(userData, { abortEarly: false })
    .catch((err) => {
      throw Boom.badRequest(err.details.map((e) => e.message).join('\n'));
    })
    .then(() => checkEmail(req.body.email))
    .then((result) => {
      if (result.rows.length === 0) {
        return bcrypt.hash(req.body.password, 10);
      }
      throw Boom.badRequest(`${result.rows[0].email} not avaliable!!`);
    })
    .then((hashedPassword) => {
      const newUser = {
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      };
      return createUser(newUser);
    })

    .then(() => res.status(200).json({ message: 'signed up successfully' }))
    .catch(next);
};
