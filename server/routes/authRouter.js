import express from 'express';

const authRouter = express.Router();

authRouter.get('/logIn', (req, res) =>
  res.render('auth/logIn', { title: 'Log In' })
);

export { authRouter };
