const { clientError, serverError } = require('./error');
const validateSignUp = require('./validation/validateSignUp');
const signup = require('./signup');

module.exports = { clientError, serverError, validateSignUp, signup };
