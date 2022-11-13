function authCheck(req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect('/auth/logIn');
  }

  next();
}

export default authCheck;
