exports.clientError = (req, res) => {
  res.status(404).send({ message: 'Page Not Found', statusCode: 404 });
};
// eslint-disable-next-line no-unused-vars
exports.serverError = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'production') console.error(err);

  // boom error
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode).send(payload);
};
