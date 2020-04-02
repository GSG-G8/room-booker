const router = require('express').Router();
const {
  clientError,
  serverError,
  signup,
  login,
  getRBookingbyDate,
  getUsers,
} = require('./controllers');
const { checkAdmin, verifyUser } = require('./controllers/middleware');

router.post('/signup', signup);
router.post('/login', login);

// only logged in access under this:
router.use(verifyUser);
router.get('/rooms/:date', getRBookingbyDate); // rooms/2020-04-05

// logged in + admin only acess routes:
router.use(checkAdmin);

router.get('/getUsers', getUsers);

router.use(clientError);
router.use(serverError);

module.exports = router;
