const Boom = require('@hapi/boom');
const { verify } = require('../utils/jwt');

// This middleware only verifies that there is a user logged in, and puts the id and role in req.user
module.exports = (req, res, next) => {
  verify(req.cookies.token)
    .then((decoded) => {
      req.user = decoded;
      next();
    })
    .catch(() => next(Boom.unauthorized()));
};
