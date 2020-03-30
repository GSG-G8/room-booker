const router = require('express').Router();
const { checkActive } = require('./controllers/checkActive');
const { getUser } = require('./controllers/getUsers');
const { clientError, serverError } = require('./controllers');

router.get('/getProfile', checkActive, getUser);

router.use(clientError);
router.use(serverError);

module.exports = router;
