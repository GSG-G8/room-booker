const Boom = require('@hapi/boom');

const { verifyCookie } = require('../../utils/jwt');
const { deleteUser } = require('../../database/queries');

module.exports = (req, res, next) => {
  const { id } = req.params;
  verifyCookie(req.cookies.token)
    .then(({ role }) => {
      if (role) {
        return deleteUser(id);
      }
      throw Boom.unauthorized('This action just for admin');
    })
    .then(() => res.json({ msg: 'The user has delete successfully' }))
    .catch(next);
};
