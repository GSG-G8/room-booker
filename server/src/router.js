const router = require('express').Router();
const {
  clientError,
  serverError,
  signup,
  login,
  getUsers,
} = require('./controllers');
const { checkAdmin } = require('./controllers/checkAdmin');
const verifyUser = require('./controllers/verifyUser');

router.post('/signup', signup);
router.post('/login', login);

// only logged in access under this:
router.use(verifyUser);

// logged in + admin only acess routes:
router.use(checkAdmin);

router.get('/getUsers', getUsers);

router.use(clientError);
router.use(serverError);

module.exports = router;
