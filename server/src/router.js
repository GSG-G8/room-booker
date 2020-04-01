const router = require('express').Router();
const {
  clientError,
  serverError,
  signup,
  login,
  deleteUser,
  checkAdmin,
} = require('./controllers');

router.post('/signup', signup);
router.post('/login', login);
router.delete('/users/:id', checkAdmin, deleteUser);

router.use(clientError);
router.use(serverError);

module.exports = router;
