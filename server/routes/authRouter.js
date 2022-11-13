import express from 'express';

import authCheck from '../middlware/authCheck.js';
import { User } from '../models/userModel.js';

const authRouter = express.Router();

authRouter.get('/logIn', (req, res) => res.render('auth/logIn'));

authRouter.post('/logIn', (req, res) => {
  return User.findOne({ email: 'testApp@test.com' }).then(user => {
    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect('/');
    });
  });
});

authRouter.get('/logOut', authCheck, (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

export { authRouter };
