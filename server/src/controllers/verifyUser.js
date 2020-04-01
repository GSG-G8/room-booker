const jwt = require('jsonwebtoken');
require('env2')('./config.env');
const getUser = require('../database/queries/getUser');

module.exports = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
    if (decoded !== undefined) {
      getUser(decoded.userID).then((users) => {
        [req.user = null] = users.rows;
        next();
      });
    } else {
      req.user = null;
      next();
    }
  });
};
