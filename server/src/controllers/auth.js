require('env2')('./config.env');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const signUpSchema = require('./validation/signupSchema');
const { checkEmail, createUser } = require('../database/queries');
const { sign } = require('../utils/jwt');
const loginSchema = require('./validation/loginSchema');

exports.signup = (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  };
  signUpSchema
    .validateAsync(userData, { abortEarly: false })
    .catch((err) => {
      throw Boom.badRequest(err.details.map((e) => e.message).join('\n'));
    })
    .then(() => checkEmail(req.body.email))
    .then((result) => {
      if (result.rows.length === 0) {
        return bcrypt.hash(req.body.password, 10);
      }
      throw Boom.badRequest(`${result.rows[0].email} not avaliable!!`);
    })
    .then((hashedPassword) => {
      const newUser = {
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      };
      return createUser(newUser);
    })

    .then(() => res.status(200).json({ message: 'signed up successfully' }))
    .catch(next);
};

exports.login = (req, res, next) => {
  let tokenData = {};
  const { email, password } = req.body;
  loginSchema
    .validateAsync({ email, password }, { abortEarly: false })
    .catch((error) => {
      throw Boom.badRequest(error.details.map((e) => e.message).join('\n'));
    })
    .then(() => checkEmail(email))
    .then(({ rows }) => {
      if (rows.length > 0) {
        return rows[0];
      }
      throw Boom.unauthorized('You need to signup first');
    })
    .then((userData) => {
      if (userData.is_active) {
        tokenData = { ...userData };
        return userData.password;
      }
      throw Boom.unauthorized('Your email not authorized yet');
    })
    .then((hashedPassword) => bcrypt.compare(password, hashedPassword))
    .then((result) => {
      if (result) {
        return sign({
          userID: tokenData.id,
          role: tokenData.is_admin,
          username: tokenData.name,
        });
      }
      throw Boom.unauthorized('invalid password');
    })
    .then((token) => {
      if (token) {
        res.cookie('token', token).status(200).end();
      }
    })
    .catch(next);
};

exports.GoogleLogin = (req, res, next) => {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const client = new OAuth2Client(clientID);
  const { tokenId } = req.body;
  let payload;
  let user;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience: clientID,
    })
    .then((ticket) => {
      payload = ticket.getPayload();
      return checkEmail(payload.email);
    })
    .then((result) => {
      if (result.rows.length === 0) {
        return createUser({
          name: payload.name,
          email: payload.email,
          password: '',
        });
      }
      return result;
    })
    .then((result) => {
      [user] = result.rows;
      if (!user.is_active) return '';
      return sign({
        userID: user.id,
        role: user.is_admin,
        username: user.name,
      });
    })
    .then((token) => {
      res.cookie('token', token).json(user);
    })
    .catch(next);
};

exports.logout = (req, res) => {
  res.clearCookie('token').end();
};
