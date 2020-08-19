const router = require('express').Router();

const {
  user,
  booking,
  room,
  auth,
  error,
  businessHours,
  bookingTypes,
} = require('./controllers');

const { checkAdmin, verifyUser } = require('./controllers/middleware');

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.post('/google-login', auth.GoogleLogin);

// only logged in access under this:
router.use(verifyUser);

router.get('/auth', (req, res) => {
  res.json(req.user);
});
router.route('/profile').get(user.getProfile).patch(user.patchProfile);
router.get('/booking/:date', booking.getRBookingbyDate); // /booking/2020-04-05
router.post('/booking', booking.bookingRoom);
router.delete('/booking/:id', booking.deleteBooking);
router.get('/rooms', room.getRooms);
router.get('/businessHours', businessHours.get);
router.get('/bookingTypes', bookingTypes.getTypes);

// logged in + admin only acess routes:
router.use(checkAdmin);

router.post('/rooms', room.addRoom);
router.route('/rooms/:id').delete(room.deleteRoomById).patch(room.patchRoom);
router.route('/users/:id').delete(user.deleteUser).patch(user.activateAccount);
router.get('/users', user.getUsers);
router.patch('/businessHours', businessHours.patch);

router.use(error.clientError);
router.use(error.serverError);

module.exports = router;
