import { Schema, model } from 'mongoose';

const checkoutSchema = new Schema({
  orders: [
    {
      product: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Checkout = model('Checkout', checkoutSchema);

export { Checkout };
