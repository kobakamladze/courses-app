function authStatus(req, res, next) {
  res.locals.isAuth = req.session.isAuthenticated;
  next();
}

export default authStatus;
