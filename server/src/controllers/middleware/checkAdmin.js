const Boom = require('@hapi/boom');

module.exports = (req, res, next) => {
  if (req.user.role) {
    next();
  } else {
    next(Boom.forbidden('Admin only endpoint'));
  }
};
