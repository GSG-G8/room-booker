const router = require('express').Router();
const loginValidation = require('./controllers/validation/loginValidation');
const { logout } = require('./controllers');

router.post('/login', loginValidation);
router.get('/logout', logout);
module.exports = router;
module.exports = router;
