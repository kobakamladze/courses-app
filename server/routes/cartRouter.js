import _ from 'lodash';
import express from 'express';

import { getTotalPrice } from '../models/cartModel.js';
import { Course } from '../models/coursesModel.js';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) =>
  req.user.populate('cart.items.courseId').then(({ cart: { items } }) => {
    const modifiedItems = items.length
      ? _.map(items, ({ courseId, quantity }) => ({
          ...courseId._doc,
          quantity,
        }))
      : [];

    return res.render('cart', {
      cartList: modifiedItems,
      totalPrice: getTotalPrice(modifiedItems),
    });
  })
);

cartRouter.post('/add/:id', (req, res) => {
  const id = req.params.id;

  return Course.findById(id)
    .then(course => req.user.addToCart(course))
    .then(() => res.redirect('/cart'));
});

cartRouter.post('/remove/:id', (req, res) => {
  const id = req.params.id;

  return req.user
    .deleteFromCart(id)
    .then(() => res.redirect('/cart'))
    .catch(err => {
      if (err) console.log(err);
      return res.render('error', { error: err });
    });
});

export { cartRouter };
