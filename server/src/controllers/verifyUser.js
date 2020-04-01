const jwt = require('jsonwebtoken');
require('env2')('./config.env');
const Boom = require('@hapi/boom');
const getUserById = require('../database/queries/getUserById');

module.exports = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
    if (decoded !== undefined) {
      getUserById(decoded.userID).then((users) => {
        if (users.rows.length !== 0) {
          [req.user] = users.rows;
          next();
        } else next(Boom.unauthorized('You are not logged in'));
      });
    } else next(Boom.unauthorized('You are not logged in'));
  });
};
