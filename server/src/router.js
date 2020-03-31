const router = require('express').Router();
const { checkAdmin } = require('./controllers/checkAdmin');
const { getUsers } = require('./controllers/getUsers');

const { clientError, serverError } = require('./controllers');

const loginValidation = require('./controllers/validation/loginValidation');

router.get('/getUsers', checkAdmin, getUsers);
router.post('/login', loginValidation);

router.use(clientError);
router.use(serverError);

module.exports = router;
