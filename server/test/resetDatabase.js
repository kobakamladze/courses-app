import chai from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

import { Course } from '../models/coursesModel.js';
import { CartItem } from '../models/cartModel.js';
import { User } from '../models/userModel.js';

dotenv.config();
chai.expect();

const PORT = process.env.PORT || 3000;
const DOMAIN = `http://localhost:${PORT}`;

describe('resetDatabase', () => {
  before('Connecting to database', () => {
    mongoose.connection.on('err', err => console.log(err));

    return mongoose.connect(
      `mongodb+srv://koba08:${process.env.DB_PASSWORD}@coursesapp.bki86ux.mongodb.net/?retryWrites=true&w=majority`
    );
  });

  it('Reset', () => {
    return Course.deleteMany()
      .then(() =>
        Promise.all([
          axios.post(`${DOMAIN}/add`, {
            productId: uuid(),
            title: 'Node JS',
            price: 60,
            img: 'https://ih1.redbubble.net/image.1637717834.1604/aps,504x498,small,transparent-pad,600x600,f8f8f8.u1.jpg',
          }),
          axios.post(`${DOMAIN}/add`, {
            productId: uuid(),
            title: 'Angular JS',
            price: 120,
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
          }),
        ])
      )
      .then(() => User.deleteMany())
      .then(() => CartItem.deleteMany())
      .finally();
  });
});
