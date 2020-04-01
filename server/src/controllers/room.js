const Boom = require('@hapi/boom');

const { verifyCookie } = require('../utils/jwt');
const { roomSchema } = require('./validation/roomSchema');
const { addNewRoom, getRoom } = require('../database/queries');

const addRoom = (req, res, next) => {
  const { name } = req.body;
  roomSchema
    .validateAsync({ name })
    .catch((error) => {
      throw Boom.badRequest(error.message);
    })
    .then(() => verifyCookie(req.cookies.token))
    .then(({ role }) => {
      if (role) {
        return getRoom(name);
      }
      throw Boom.unauthorized('This action just for admin');
    })
    .then(({ rows }) => {
      if (rows.length === 0) {
        addNewRoom(name);
      } else {
        throw Boom.badRequest(`${name} not avaliable!!`);
      }
    })
    .then(() => res.status(200).json('room added successfully'))

    .catch(next);
};

module.exports = { addRoom };
