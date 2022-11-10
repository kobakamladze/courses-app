import express from 'express';

import { addToCart, getCartList, removeFromCart } from '../models/cartModel.js';
import { getTotalPrice } from '../models/cartModel.js';
import { Course } from '../models/coursesModel.js';
import { User, userSchema } from '../models/userModel.js';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
  // return getCartList()
  //   .then(cartList => Promise.all([cartList, getTotalPrice(cartList)]))
  //   .then(([cartList, totalPrice]) => {
  //     return res.render('cart', { cartList, totalPrice });
  //   });
  const pop = req.user.populate('course');
  console.log(JSON.stringify(pop));
});

cartRouter.post('/add/:id', (req, res) => {
  const id = req.params.id;
  // return addToCart(productId)
  //   .then(() => res.redirect('/cart'))
  //   .catch(err => {
  //     if (err) console.log(err);
  //     return res.redirect('/');
  //   });
  console.log(req.user);
  return Course.findById(id)
    .then(course => req.user.addToCart(course))
    .then(() => {});
});

cartRouter.post('/remove/:productId', (req, res) => {
  const { productId } = req.params;

  return removeFromCart(productId)
    .then(() => res.redirect('/cart'))
    .catch(err => {
      if (err) console.log(err);
      return res.render('error', { error: err });
    });
});

export { cartRouter };
