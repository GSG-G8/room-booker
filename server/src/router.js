const router = require('express').Router();

const { login } = require('./controllers');

router.post('/login', login);

module.exports = router;
