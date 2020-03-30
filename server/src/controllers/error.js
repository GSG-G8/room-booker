exports.clientError = (req, res) => {
  res.status(404).send({ message: 'Page Not Found', statusCode: 404 });
};
// eslint-disable-next-line no-unused-vars
exports.serverError = (err, req, res, next) => {
  res.status(500).send({ message: 'Internal Server Error', statusCode: 500 });
};
