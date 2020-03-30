const { getUsers } = require('../database/queries/get_users');

exports.getUser = (req, res) => {
  getUsers('amoodaa@gazaskygeeks.com').then((users) => {
    if (users.rowCount === 0) {
      res.status(404).json([]);
    } else res.json(users.rows[0]);
  });
};
