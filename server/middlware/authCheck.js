function signed(req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect('/auth/logIn');
  }

  next();
}

function notSigned(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }

  // return res.redirect('/auth/logIn');
}

export { signed, notSigned };
