const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const {
  deleteUserById,
  getUserById,
  getUsers,
  patchProfile,
  getUserWithPassword,
  activateUser,
  makeAdmin,
} = require('../database/queries');
const profileScema = require('./validation/profileSchema');
const activateSchema = require('./validation/activateSchema');

exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  deleteUserById(id)
    .then(() => res.json({ msg: 'The user has delete successfully' }))
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.json(users.rows);
    })
    .catch((error) => {
      next(Boom.badImplementation(error.message));
    });
};

exports.getProfile = (req, res) => {
  getUserById(req.user.userID).then((users) => {
    if (users.rows.length === 0) {
      res.status(404).end();
    } else res.json(users.rows[0]);
  });
};

exports.patchProfile = (req, res, next) => {
  const { userID } = req.user;
  const { name, oldPassword = '', password } = req.body;

  profileScema
    .validateAsync({ name, password }, { abortEarly: false })
    .catch((error) => {
      throw Boom.badRequest(error);
    })
    .then(() => getUserWithPassword(userID))
    .then((users) => {
      if (users.rows.length === 0) {
        throw Boom.notFound('user does not exists');
      }
      return users.rows[0].password;
    })
    .then((hashed) => bcrypt.compare(oldPassword, hashed))
    .then((match) => {
      if (!match) {
        throw Boom.badRequest('old password is wrong');
      }
    })
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => patchProfile(userID, name, hash))
    .then((results) => res.send(results.rows.length !== 0))
    .catch(next);
};

exports.activateAccount = (req, res, next) => {
  const { admin, active } = req.body;
  const { id } = req.params;

  activateSchema
    .validateAsync({ active, admin })
    .catch((error) => {
      throw Boom.badRequest(error.message);
    })
    .then(() => {
      const promiseArray = [];
      if (active !== undefined) promiseArray.push(activateUser(id, active));
      if (admin !== undefined) promiseArray.push(makeAdmin(id, admin));
      return Promise.all(promiseArray);
    })
    .then(() => res.status(200).end())
    .catch(next);
};
