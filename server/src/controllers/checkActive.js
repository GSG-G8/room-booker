exports.checkActive = (req, res, next) => {
  if (req.user.is_active) {
    next();
  } else {
    res.status(403).send();
  }
};
