const router = require('express').Router();
const loginValidation = require('./controllers/validation/loginValidation');

router.post('/login', loginValidation);
module.exports = router;
module.exports = router;
