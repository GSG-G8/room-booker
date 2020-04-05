module.exports = (req, res) => {
  res.clearCookie('token').end();
};
