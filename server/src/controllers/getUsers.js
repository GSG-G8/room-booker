const Boom = require('@hapi/boom');
const { getUsers } = require('../database/queries/getUsers');

module.exports = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).json(users.rows);
    })
    .catch((error) => {
      next(Boom.badImplementation(error.message));
    });
};
