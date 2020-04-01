const router = require('express').Router();
const {
  clientError,
  serverError,
  signup,
  login,
  addRoom,
} = require('./controllers');

router.post('/signup', signup);
router.post('/login', login);
router.post('/rooms', addRoom);

router.use(clientError);
router.use(serverError);

module.exports = router;
