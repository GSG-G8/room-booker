const { getUser } = require('../database/queries');

module.exports = (req, res) => {
  console.log(req.user);
  getUser(req.user).then((users) => {
    if (users.rowCount === 0) {
      res.status(404).json([]);
    } else res.json(users.rows[0]);
  });
};
