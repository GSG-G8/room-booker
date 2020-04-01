const router = require('express').Router();
const {
  clientError,
  serverError,
  signup,
  login,
  logout,
} = require('./controllers');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.use(clientError);
router.use(serverError);

module.exports = router;
