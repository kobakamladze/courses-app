import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { Schema, model } from 'mongoose';

import { getCourseById } from '../routes/coursesRouter.js';

const cartItemSchema = new Schema({
  productId: { type: String, default: uuid.v4 },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  user: {
    ref: 'Users',
    type: Schema.Types.ObjectId,
  },
});

const CartItem = model('CartItem', cartItemSchema);

function getTotalPrice(cartList) {
  return _.reduce(
    cartList,
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );
}

function getCartList() {
  return CartItem.find()
    .select('productId title price img')
    .then(cartList =>
      _.chain(cartList)
        .map(cartList =>
          _.pick(cartList, ['productId', 'title', 'price', 'img'])
        )
        .groupBy('productId')
        .map(subArray => ({
          ...subArray[0],
          quantity: subArray.length,
        }))
        .value()
    );
}

function getCartItemById(id) {
  return CartItem.findById(id);
}

function addToCart(id) {
  return getCourseById(id)
    .then(courseToAddToCart => {
      if (!courseToAddToCart) {
        console.error('Course could not be found.');
        return Promise.reject();
      }

      const { productId, title, price, img } = courseToAddToCart;

      const newCartItem = new CartItem({ productId, title, price, img });
      return newCartItem.save();
    })
    .catch(err => console.log(err));
}

function removeFromCart(id) {
  return CartItem.deleteMany({ productId: id });
}

export { addToCart, removeFromCart, getTotalPrice, getCartList, CartItem };
