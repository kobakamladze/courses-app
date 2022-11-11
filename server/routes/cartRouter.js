import _ from 'lodash';

import express from 'express';

import { addToCart, getCartList, removeFromCart } from '../models/cartModel.js';
import { getTotalPrice } from '../models/cartModel.js';
import { Course } from '../models/coursesModel.js';
import { User, userSchema } from '../models/userModel.js';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) =>
  req.user.populate('cartItems.courseId').then(({ cartItems }) => {
    console.log(cartItems);
    const modifiedResponse = cartItems.length
      ? _.map(cartItems, ({ courseId, quantity }) => ({
          ...courseId._doc,
          quantity,
        }))
      : [];

    return res.render('cart', {
      cartItems: modifiedResponse,
      totalPrice: getTotalPrice(modifiedResponse),
    });
  })
);

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
