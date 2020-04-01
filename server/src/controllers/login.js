const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
require('env2')('./config.env');

const { checkEmail } = require('../database/queries');
const { sign } = require('../utils/jwt');
const schema = require('./validation/loginSchema');

module.exports = (req, res, next) => {
  let tokenData = {};
  const { email, password } = req.body;
  schema
    .validateAsync({ email, password }, { abortEarly: false })
    .catch((error) => {
      throw Boom.badRequest(error.details.map((e) => e.message).join('\n'));
    })
    .then(() => checkEmail(email))
    .then(({ rows }) => {
      if (rows.length > 0) {
        return rows[0];
      }
      throw Boom.unauthorized('You need to signup first');
    })
    .then((userData) => {
      if (userData.is_active) {
        tokenData = { ...userData };
        return userData.password;
      }
      throw Boom.unauthorized('Your email not authorized yet');
    })
    .then((hashedPassword) => bcrypt.compare(password, hashedPassword))
    .then((result) => {
      if (result) {
        return sign({
          userID: tokenData.id,
          role: tokenData.is_Admin,
        });
      }
      throw Boom.unauthorized('invalid password');
    })
    .then((token) => {
      if (token) {
        res.cookie('token', token).status(200).end();
      }
    })
    .catch(next);
};
