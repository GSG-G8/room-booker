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
const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
module.exports = { sign, verify };
