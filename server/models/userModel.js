import mongoose, { Schema } from 'mongoose';

import _ from 'lodash';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      courseId: {
        ref: 'Course',
        type: Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
  password: {
    type: String,
    // TO DO
    required: false,
  },
});

userSchema.methods.addToCart = function (course) {
  const courseExistence = _.find(this.cartItems, course._id);
  if (!courseExistence) this.cartItems.push({ courseId: course._id });

  const idx = _.findIndex(
    this.cartItems,
    cartItem => cartItem.courseId.toString() === course._id.toString()
  );
  console.log('INDEX === ' + idx);
  console.log('_ID === ' + course._id.toString());
  console.log(this.cartItems[0].courseId.toString());
  if (idx >= 0) this.cartItems[idx].quantity = this.cartItems[idx].quantity + 1;

  console.log('CART ITEM === ' + this.cartItems[idx]);

  return this.save();
};

const User = mongoose.model('User', userSchema);

export { User, userSchema };
