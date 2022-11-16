import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const mailer = nodemailer.createTransport(
  sgTransport({ auth: { api_key: process.env.SANDGRID_KEY } })
);

import { signed, notSigned } from '../middlware/authCheck.js';
import { User } from '../models/userModel.js';
import emialSetUp from '../email/emailSetup.js';

const authRouter = express.Router();

authRouter.get('/logIn', notSigned, (req, res) =>
  res.render('auth/logIn', {
    logInError: req.flash('logInError'),
    registerError: req.flash('registerError'),
  })
);

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

      return newUser.save().then(() => {
        const emailOptions = emialSetUp(email);
        return mailer.sendMail(emailOptions, err => console.log(err));
      });
    })
    .then(() => res.redirect('/auth/logIn#login'))
    .catch(err => {
      console.log(JSON.stringify(err));
      res.render('error', err);
    })
    .finally();
});

authRouter.get('/logOut', signed, (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

export { authRouter };
