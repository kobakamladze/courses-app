import express from 'express';

import { signed } from '../middlware/authCheck.js';
import { addCourse } from '../models/coursesModel.js';

const addRouter = express.Router();

addRouter.get('/', signed, (req, res) =>
  res.render('add', { title: 'Add Course' })
);

addRouter.post('/', signed, (req, res) => {
  const { productId, img, price, title } = req.body;
  return addCourse({ productId, price, title, img })
    .then(() => res.redirect('/courses'))
    .finally();
});

export { addRouter };
