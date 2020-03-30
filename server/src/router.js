const router = require('express').Router();
const { checkAdmin } = require('./controllers/checkAdmin');
const { getUsers } = require('./controllers/getUsers');

const { clientError, serverError } = require('./controllers');

router.get('/getUsers', checkAdmin, getUsers);

router.use(clientError);
router.use(serverError);

module.exports = router;
