const router = require('express').Router();
const {
  clientError,
  serverError,
  signup,
  login,
  logout,
  getRBookingbyDate,
  addRoom,
  deleteUser,
  getUsers,
  activateAccount,
  patchProfile,
  deleteBooking,
  getProfile,
  getRooms,
  deleteRoomByID,
  patchRoom,
  bookingRoom,
} = require('./controllers');
const { checkAdmin, verifyUser } = require('./controllers/middleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// only logged in access under this:
router.use(verifyUser);
router.get('/auth', (req, res) => {
  res.json(req.user);
});
router.patch('/patchProfile', patchProfile);
router.get('/profile', getProfile);
router.get('/rooms/:date', getRBookingbyDate); // rooms/2020-04-05
router.post('/booking', bookingRoom);
router.delete('/booking/:id', deleteBooking);
router.get('/rooms', getRooms);

// logged in + admin only acess routes:
router.use(checkAdmin);

router.post('/rooms', addRoom);
router.delete('/rooms/:id', deleteRoomByID);
router.patch('/rooms/:id', patchRoom);
router.delete('/users/:id', deleteUser);
router.get('/getUsers', getUsers);
router.patch('/users/:id', activateAccount);

router.use(clientError);
router.use(serverError);

module.exports = router;
