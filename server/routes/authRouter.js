import express from 'express';

import { signed, notSigned } from '../middlware/authCheck.js';
import { User } from '../models/userModel.js';

const authRouter = express.Router();

authRouter.get('/logIn', notSigned, (req, res) => res.render('auth/logIn'));

authRouter.post('/logIn', notSigned, (req, res) => {
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

authRouter.get('/logOut', signed, (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

export { authRouter };
