const boom = require('@hapi/boom');
const { checkEmailExist } = require('../database/queries');

module.exports = (req, res, next) => {
  checkEmailExist(req.body.email)
    .then((result) => {
      if (result.rows.length === 0) {
        next();
      } else {
        const err = boom.badRequest(`${result.rows[0].email} already exists`);
        next(err);
      }
    })
    .catch(next);
};
