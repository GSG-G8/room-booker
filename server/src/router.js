const router = require('express').Router();
const { clientError, serverError, signup, login } = require('./controllers');

router.post('/signup', signup);
router.post('/login', login);

router.use(clientError);
router.use(serverError);

module.exports = router;
