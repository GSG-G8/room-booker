const { deleteRoomByID } = require('../database/queries/addRoom');

module.exports = (req, res, next) => {
  const { id } = req.params;
  deleteRoomByID(id)
    .then(() => res.json({ msg: 'The room has been deleted successfully' }))
    .catch(next);
};
