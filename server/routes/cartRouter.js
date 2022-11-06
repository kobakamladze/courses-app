import express from 'express';

import { addToCart, getCartList, removeFromCart } from '../models/cartModel.js';
import { getTotalPrice } from '../models/cartModel.js';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
  return getCartList()
    .then(cartList => Promise.all([cartList, getTotalPrice(cartList)]))
    .then(([cartList, totalPrice]) => {
      return res.render('cart', { cartList, totalPrice });
    });
});

cartRouter.post('/add/:productId', (req, res) => {
  const productId = req.params.productId;
  return addToCart(productId)
    .then(() => res.redirect('/cart'))
    .catch(err => {
      if (err) console.log(err);
      return res.redirect('/');
    });
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
