const router = require('express').Router();

const { login, addRoom } = require('./controllers');

router.post('/login', login);
router.post('/rooms', addRoom);

module.exports = router;
