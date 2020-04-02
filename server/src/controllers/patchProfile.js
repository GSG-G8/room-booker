const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const patchProfile = require('../database/queries/patchProfile');
const profileScema = require('./validation/profileSchema');

module.exports = (req, res, next) => {
  const { name, password } = req.body;
  profileScema
    .validateAsync({ name, password }, { abortEarly: false })
    .then(() => bcrypt.hash(req.body.password, 10))
    .then((hash) => patchProfile(req.user.userID, name, hash))
    .then((results) => res.send(results.rows.length !== 0))
    .catch((error) => {
      next(Boom.badRequest(error));
    });
};
