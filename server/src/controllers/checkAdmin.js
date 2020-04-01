const Boom = require('@hapi/boom');

exports.checkAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    next(Boom.unauthorized('You are not admin'));
  }
};
