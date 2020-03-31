const router = require('express').Router();

const {
  validateLogin,
  checkEmailExist,
  checkPassword,
} = require('./controllers');

router.post('/login', validateLogin, checkEmailExist, checkPassword);

module.exports = router;
