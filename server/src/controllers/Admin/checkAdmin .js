const Boom = require('@hapi/boom');

module.exports = (req, res, next) => {
  console.log('99', req.is_admin);
  if (req.user.is_admin) {
    next();
  } else {
    throw Boom.unauthorized('You are not admin');
  }
};
