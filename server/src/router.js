const router = require('express').Router();
const { checkAdmin } = require('./controllers/checkAdmin');
const getUsers = require('./controllers/getUsers');

const { clientError, serverError } = require('./controllers');

const { login } = require('./controllers');
const verifyUser = require('./controllers/verifyUser');

router.post('/login', login);

router.use(verifyUser);
router.get('/getUsers', checkAdmin, getUsers);

router.use(clientError);
router.use(serverError);

module.exports = router;
