const Boom = require('@hapi/boom');

const { roomSchema } = require('./validation/roomSchema');
const { addNewRoom, getRoom, getRooms } = require('../database/queries');
const { patchRoom, deleteRoomByID } = require('../database/queries/addRoom');

exports.addRoom = (req, res, next) => {
  const { name } = req.body;
  roomSchema
    .validateAsync({ name })
    .catch((error) => {
      throw Boom.badRequest(error.message);
    })
    .then(() => getRoom(name))
    .then(({ rows }) => {
      if (rows.length === 0) {
        return addNewRoom(name);
      }
      throw Boom.badRequest(`${name} already exist`);
    })
    .then(() => res.status(201).json('room added successfully'))

    .catch(next);
};

exports.getRooms = (req, res, next) => {
  getRooms()
    .then((rooms) => {
      res.json(rooms.rows);
    })
    .catch((error) => {
      next(Boom.badImplementation(error.message));
    });
};

exports.patchRoom = (req, res, next) => {
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

exports.deleteRoomById = (req, res, next) => {
  const { id } = req.params;
  deleteRoomByID(id)
    .then(() => res.json({ msg: 'The room has been deleted successfully' }))
    .catch(next);
};
