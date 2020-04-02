const Boom = require('@hapi/boom');

const { roomSchema } = require('./validation/roomSchema');
const { addNewRoom, getRoom } = require('../database/queries');

const addRoom = (req, res, next) => {
  const { name } = req.body;
  roomSchema
    .validateAsync({ name })
    .catch((error) => {
      throw Boom.badRequest(error.message);
    })
    .then(() => getRoom(name))
    .then(({ rows }) => {
      if (rows.length === 0) {
        addNewRoom(name);
      } else {
        throw Boom.badRequest(`${name} already exist`);
      }
    })
    .then(() => res.status(201).json('room added successfully'))

    .catch(next);
};

module.exports = { addRoom };
