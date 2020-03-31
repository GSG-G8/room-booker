const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
require('env2')('./config.env');

const { checkEmail } = require('../database/queries');
const { sendCookies } = require('../utils/jwt');
const schema = require('./validation/loginSchema');

const login = (req, res, next) => {
  const { email, password } = req.body;
  schema
    .validateAsync({ email, password }, { abortEarly: false })
    .then(() => checkEmail(email))
    .then(({ rows }) => {
      if (rows.length > 0) {
        return rows[0];
      }
      return next(Boom.unauthorized('You need to signup first'));
    })
    .then((userData) => {
      if (userData.is_active) {
        req.userID = userData.id;
        req.isAdmin = userData.is_Admin;
        return userData.password;
      }
      return next(Boom.unauthorized('Your email not authorized yet'));
    })
    .then((hashedPassword) => bcrypt.compare(password, hashedPassword))
    .then((result) => {
      if (result) {
        sendCookies({ userID: req.userID, role: req.isAdmin }).then((token) =>
          res.cookie('token', token).status(200).json('good job')
        );
      }
      return next(Boom.unauthorized('invalid password'));
    })
    .catch((error) =>
      next(Boom.badRequest(error.details.map((e) => e.message).join('\n')))
    );
};

module.exports = {
  login,
};
