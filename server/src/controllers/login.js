const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');

const { checkEmail } = require('../database/queries');

const sendCookies = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_KEY, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });

const checkEmailExist = (req, res, next) => {
  checkEmail(req.body.email)
    // eslint-disable-next-line consistent-return
    .then(({ rows }) => {
      if (rows.length === 1) {
        return rows[0];
      }
      next(Boom.unauthorized('You need to signup first'));
    })
    .then((userData) => {
      if (userData.is_active) {
        req.userID = userData.id;
        req.isAdmin = userData.is_Admin;
        next();
      } else {
        next(Boom.unauthorized('Your email not authorized yet'));
      }
    })
    .catch((error) => next(error));
};

const checkPassword = (req, res, next) => {
  checkEmail(req.body.email)
    .then(({ rows }) => rows[0].password)
    .then((hashedPassword) => bcrypt.compare(req.body.password, hashedPassword))
    .then((result) => {
      if (result) {
        sendCookies({ userID: req.userID, role: req.isAdmin }).then((token) =>
          res.cookie('token', token)
        );
      } else {
        next(Boom.unauthorized('invalid password'));
      }
    })
    .catch((error) => next(error));
};

module.exports = {
  checkEmailExist,
  checkPassword,
};
