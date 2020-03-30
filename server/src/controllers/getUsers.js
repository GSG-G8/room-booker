const { getUsers } = require('../database/queries/get_users');

exports.getUsers = (req, res) => {
  getUsers().then((users) => {
    res.json(users.rows);
  });
};
