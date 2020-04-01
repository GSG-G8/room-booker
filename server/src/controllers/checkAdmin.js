const Boom = require('@hapi/boom');

exports.checkAdmin = (req, res, next) => {
  if (req.user.role) {
    next();
  } else {
    next(Boom.forbidden('Admin only endpoint'));
  }
};
