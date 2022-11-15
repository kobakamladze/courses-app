import _ from 'lodash';
import express from 'express';

import { Checkout } from '../models/checkoutModel.js';
import { signed } from '../middlware/authCheck.js';

const checkoutRouter = express.Router();

checkoutRouter.post('/', signed, (req, res) =>
  req.user
    .populate('cart.items.courseId')
    .then(({ cart: { items } }) => {
      const modifiedItems = items.length
        ? _.map(items, ({ courseId, quantity }) => ({
            product: courseId._doc,
            quantity,
          }))
        : [];

      if (!modifiedItems.length) return res.render('error');

      const checkout = new Checkout({
        user: { name: req.user.name, userId: req.user },
        orders: modifiedItems,
      });

      return checkout.save();
    })
    .then(() =>
      Checkout.findOne({ 'user.userId': req.user._id }).then(userCheckout =>
        res.render('checkout', { checkoutList: userCheckout })
      )
    )
    .finally()
);

export { checkoutRouter };
