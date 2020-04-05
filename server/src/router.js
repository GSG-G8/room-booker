const router = require('express').Router();
const {
  clientError,
  serverError,
  signup,
  login,
  getRBookingbyDate,
  addRoom,
  deleteUser,
  getUsers,
  patchProfile,
} = require('./controllers');
const { checkAdmin, verifyUser } = require('./controllers/middleware');

router.post('/signup', signup);
router.post('/login', login);

// only logged in access under this:
router.use(verifyUser);
router.patch('/patchProfile', patchProfile);
router.get('/rooms/:date', getRBookingbyDate); // rooms/2020-04-05

// logged in + admin only acess routes:
router.use(checkAdmin);

router.post('/rooms', addRoom);
router.delete('/users/:id', deleteUser);
router.get('/getUsers', getUsers);

router.use(clientError);
router.use(serverError);

module.exports = router;
