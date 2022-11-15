import { User } from '../models/userModel.js';

function userModelSetup(req, res, next) {
  if (!req.session.user) {
    return next();
  }

  return User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .finally();
}

export default userModelSetup;
