const Boom = require('@hapi/boom');

const { roomSchema } = require('./validation/roomSchema');
const { patchRoom } = require('../database/queries/addRoom');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  roomSchema
    .validateAsync({ name })
    .catch((error) => {
      throw Boom.badRequest(error.message);
    })
    .then(() => patchRoom(id, name))
    .then(({ rows }) => {
      if (rows.length !== 0) {
        res.status(201).json('room has been updated successfully');
      }
      throw Boom.notFound(`room doesn't exist`);
    })
    .catch(next);
};
