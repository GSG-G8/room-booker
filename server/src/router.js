const router = require('express').Router();
const {
  clientError,
  serverError,
  signup,
  login,
  addRoom,
  deleteUser,
  getUsers,
  activateAccount,
} = require('./controllers');
const { checkAdmin, verifyUser } = require('./controllers/middleware');

router.post('/signup', signup);
router.post('/login', login);

// only logged in access under this:
router.use(verifyUser);

// logged in + admin only acess routes:
router.use(checkAdmin);

router.post('/rooms', addRoom);
router.delete('/users/:id', deleteUser);
router.get('/getUsers', getUsers);
router.patch('/users/:id', activateAccount);

router.use(clientError);
router.use(serverError);

module.exports = router;
