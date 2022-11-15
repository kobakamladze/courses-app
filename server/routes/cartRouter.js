import _ from 'lodash';
import express from 'express';

import { signed } from '../middlware/authCheck.js';
import { Course } from '../models/coursesModel.js';

const cartRouter = express.Router();

function getTotalPrice(cartList) {
  return _.reduce(
    cartList,
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );
}

cartRouter.get('/', signed, (req, res) =>
  req.user
    .populate('cart.items.courseId')
    .then(({ cart: { items } }) => {
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
    .finally()
);

cartRouter.post('/add/:id', signed, (req, res) => {
  const id = req.params.id;

  return Course.findById(id)
    .then(course => req.user.addToCart(course))
    .then(() => res.redirect('/cart'))
    .finally();
});

cartRouter.post('/remove/:id', signed, (req, res) => {
  const id = req.params.id;

  return req.user
    .deleteFromCart(id)
    .then(() => res.redirect('/cart'))
    .catch(err => {
      if (err) console.log(err);
      return res.render('error', { error: err });
    })
    .finally();
});

export { cartRouter };
