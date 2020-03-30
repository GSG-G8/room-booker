const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { checkEmailExist, signup } = require('../database/queries');

module.exports = (req, res, next) => {
  checkEmailExist(req.body.email)
    .then((result) => {
      if (result.rows.length === 0) {
        // next();
        bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
          const newUser = {
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
          };
          signup(newUser)
            .then(() =>
              res.status(200).json({ message: 'signed up successfully' })
            )
            .catch((error) => next(error));
        });
      } else {
        const err = boom.badRequest(`${result.rows[0].email} already exists`);
        next(err);
      }
    })
    .catch(next);
};
