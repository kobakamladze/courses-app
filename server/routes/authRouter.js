import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import sgEmailer from '@sendgrid/mail';
import randomToken from 'random-token';

import { signed, notSigned } from '../middlware/authCheck.js';
import { User } from '../models/userModel.js';
import emailSetUp from '../email/registration.js';
import resetEmailSetup from '../email/reset.js';

dotenv.config();

// Mail configuration
sgEmailer.setApiKey(process.env.SENDGRID_API_KEY);

const authRouter = express.Router();

authRouter.get('/logIn', notSigned, (req, res) => {
  return res.render('auth/logIn', {
    logInError: req.flash('logInError'),
    registerError: req.flash('registerError'),
  });
});

authRouter.post('/logIn', notSigned, (req, res) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .then(candidate => {
      if (!candidate) {
        req.flash('logInError', 'Email or password is incorrect.');
        return res.redirect('/auth/logIn#login');
      }
      const emailCheck = candidate.email === email;
      const passCheck = bcrypt.compareSync(password, candidate.password);

      if (!emailCheck || !passCheck) {
        req.flash('logInError', 'Email or password is incorrect.');
        return res.redirect('/auth/logIn#login');
      }

      req.session.user = candidate;
      req.session.isAuthenticated = true;
      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect('/');
      });
    })
    .finally();
});

authRouter.post('/register', (req, res) => {
  const { email, password, repeat } = req.body;

  let newUserMail;

  return User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('registerError', 'Email is already used.');
        return res.redirect('/auth/logIn#signUp');
      }

      // Hashing password
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
        cart: { items: [] },
      });

      newUserMail = email;

      return newUser.save();
    })
    .then(() => {
      const emailOptions = emailSetUp(newUserMail);
      return sgEmailer.send(emailOptions);
    })
    .then(() => res.redirect('/auth/logIn#login'))
    .catch(err => {
      res.render('error', err);
    })
    .finally();
});

authRouter.get('/reset', notSigned, (req, res) =>
  res.render('auth/reset', { error: req.flash('error') })
);

authRouter.post('/sendResetMail', notSigned, (req, res) => {
  const { email } = req.body;

  let userEmail;
  let userToken;

  return User.findOne({ email })
    .then(candidate => {
      if (!candidate) {
        req.flash('error', 'User with such Email could not be found.');
        return res.redirect('/auth/reset');
      }

      candidate.resetToken = randomToken(16);
      candidate.resetTokenExp = Date.now() + 10 * 60 * 1000;

      userEmail = email;
      userToken = candidate.resetToken;

      return candidate.save();
    })
    .then(() => {
      const emailOptions = resetEmailSetup({
        email: userEmail,
        resetToken: userToken,
      });

      return sgEmailer.send(emailOptions);
    })
    .then(() => res.redirect('/auth/logIn#login'))
    .catch(err => console.log(err))
    .finally();
});

authRouter.get('/passwordChange/:token', notSigned, (req, res) => {
  const token = req.params.token;

  return User.findOne({ resetToken: token }).then(candidate => {
    if (candidate.resetTokenExp < Date.now()) {
      return res.render('error', { err: 'Token expired' });
    }

    return res.render('auth/passwordChange', {
      resetToken: token,
      resetTokenExp: candidate.resetTokenExp,
      userId: candidate._id,
    });
  });
});

authRouter.post('/passwordChange/:token', (req, res) =>
  User.findOne({ _id: req.body.userId, resetToken: req.body.resetToken })
    .then(candidate => {
      if (
        candidate.resetTokenExp < Date.now() ||
        candidate.resetToken !== req.body.resetToken
      ) {
        return res.render('error', {
          err: 'Token expired or something went wrong',
        });
      }

      candidate.password = bcrypt.hashSync(`${req.body.password}`, 10);
      candidate.resetTokenExp = undefined;
      candidate.resetToken = undefined;

      return candidate.save();
    })
    .then(() => res.redirect('/'))
);

authRouter.get('/logOut', signed, (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

export { authRouter };
