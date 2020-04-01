const jwt = require('jsonwebtoken');

const sign = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_KEY, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
const verifyCookie = (cookie) =>
  new Promise((resolve, reject) => {
    jwt.verify(cookie, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });

module.exports = { sign, verifyCookie };
