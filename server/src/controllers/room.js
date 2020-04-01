const Boom = require('@hapi/boom');

const { verifyCookie } = require('../utils/jwt');
const { roomSchema } = require('./validation/roomSchema');
const { addRoomQuery } = require('../database/queries');

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
        addRoomQuery(name);
      } else {
        throw Boom.unauthorized('This action just for admin');
      }
    })
    .then(() => res.status(200).json('room added succesfilly'))
    .catch(next);
};

module.exports = { addRoom };
