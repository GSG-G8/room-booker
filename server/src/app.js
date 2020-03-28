const express = require('express');
const { join } = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const router = require('./router');

const app = express();

app.disabled('x-powered-by');

app.set('port', process.env.PORT || 5000);

const middlewares = [
  compression(),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
];

app.use(middlewares);

app.use(express.static(join(__dirname, '..', '..', 'client', 'public')));
app.use(router);
module.exports = app;
