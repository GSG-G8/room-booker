const router = require('express').Router();
const { clientError, serverError, signup } = require('./controllers');
const loginValidation = require('./controllers/validation/loginValidation');

router.post('/signup', signup);
router.post('/login', loginValidation);
router.use(clientError);
router.use(serverError);

module.exports = router;
