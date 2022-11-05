import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { Schema, model } from 'mongoose';

import { getCourseById } from '../routes/coursesRouter.js';

const cartItemSchema = new Schema({
  courseId: { type: String, default: uuid.v4, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

const CartItem = model('CartItem', cartItemSchema);

function getCartList() {
  return CartItem.find()
    .select('courseId title price img')
    .then(cartList => {
      console.log('QUERIED CART LIST === ' + JSON.stringify(cartList));

      const groupedCartList = _.chain(cartList)
        .pick(['courseId', 'title', 'price', 'img'])
        .groupBy('courseId')
        .values()
        .map(subArray => ({
          ...subArray[0],
          quantity: subArray.length,
        }))
        .value();
      console.log(
        JSON.stringify(
          'FORMATTED ARRAY OF CART ITEMS === ' + JSON.stringify(groupedCartList)
        )
      );
      return cartList;
    });
}

// getCartList();

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

      const { courseId, title, price, img } = courseToAddToCart;

      const newCartItem = new CartItem({ courseId, title, price, img });
      return newCartItem.save();
    })
    .then();

  // const matchedCourseIndex = cartList.findIndex(course => course.id === id);
  // if (matchedCourseIndex !== -1) {
  //   const macthedCourse = cartList[matchedCourseIndex];

  //   macthedCourse.quantity += 1;
  //   macthedCourse.price = Number(macthedCourse.price) * macthedCourse.quantity;

  //   return Promise.resolve();
  // }

  // cartList.push({ ...courseToAddToCart, quantity: 1 });

  // return Promise.resolve();
}

function getTotalPrice() {
  const coursesTotalPrice = _.reduce(
    cartList,
    (acc, { price }) => acc + Number(price),
    0
  );

  return coursesTotalPrice;
}

function removeFromCart(id) {
  const indexOfRemovableCourse = cartList.findIndex(course => course.id === id);

  if (indexOfRemovableCourse === -1) {
    console.error('Course could not be found!');
    return Promise.reject();
  }

  cartList.splice(indexOfRemovableCourse, 1);

  return Promise.resolve();
}

export { addToCart, removeFromCart, getTotalPrice, getCartList, CartItem };
