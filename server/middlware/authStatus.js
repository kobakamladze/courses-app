function authStatus(req, res, next) {
  res.locals.isAuth = req.session.isAuthenticated;
  res.locals.csurf = req.csrfToken();
  next();
}

export default authStatus;
