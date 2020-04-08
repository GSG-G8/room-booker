const Boom = require('@hapi/boom');
const { getUsers } = require('../database/queries');

module.exports = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.json(users.rows);
    })
    .catch((error) => {
      next(Boom.badImplementation(error.message));
    });
};
