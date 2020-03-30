exports.clientError = (req, res) => {
  res.status(404).send({ message: 'Page Not Found', statusCode: 404 });
};
exports.serverError = (err, req, res) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'development') console.error(err);
  res.status(500).send({ message: 'Internal Server Error', statusCode: 500 });
};
