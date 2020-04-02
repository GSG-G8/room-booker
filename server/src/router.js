const router = require('express').Router();
const {
  clientError,
  serverError,
  signup,
  login,
  getRBookingbyDate,
} = require('./controllers');

router.post('/signup', signup);
router.post('/login', login);

router.get('/rooms/:date', getRBookingbyDate); // rooms/2020-04-05

router.use(clientError);
router.use(serverError);

module.exports = router;
