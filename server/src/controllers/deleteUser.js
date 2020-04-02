const { deleteUser } = require('../database/queries');

module.exports = (req, res, next) => {
  const { id } = req.params;
  deleteUser(id)
    .then(() => res.json({ msg: 'The user has delete successfully' }))
    .catch(next);
};
