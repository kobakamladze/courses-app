import mongoose, { Schema } from 'mongoose';

import _ from 'lodash';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        courseId: {
          ref: 'Course',
          type: Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
});

// User methods
userSchema.methods.addToCart = function (course) {
  const courseExistence = _.find(
    this.cart.items,
    item => item.courseId.toString() === course._id.toString()
  );

  if (!courseExistence) this.cart.items.push({ courseId: course._id });

  const idx = _.findIndex(
    this.cart.items,
    cartItem => cartItem.courseId.toString() === course._id.toString()
  );

  if (idx >= 0)
    this.cart.items[idx].quantity = this.cart.items[idx].quantity + 1;

  return this.save();
};

userSchema.methods.deleteFromCart = function (id) {
  const idx = _.findIndex(
    this.cart.items,
    cartItem => cartItem.courseId.toString() === id.toString()
  );

  if (idx >= 0) this.cart.items.splice(idx, 1);

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart.items = [];

  return this.save();
};

const User = mongoose.model('User', userSchema);

export { User, userSchema };
