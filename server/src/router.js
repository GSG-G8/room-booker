const router = require('express').Router();
const {
  clientError,
  serverError,
  validateSignUp,
  signup,
} = require('./controllers');

router.post('/signUp', validateSignUp, signup);
router.use(clientError);
router.use(serverError);

module.exports = router;
