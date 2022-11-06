import express from 'express';

import { addCourse } from '../models/coursesModel.js';

const addRouter = express.Router();

addRouter.get('/', (req, res) => res.render('add', { title: 'Add Course' }));
addRouter.post('/', (req, res) => {
  const { productId, img, price, title } = req.body;
  return addCourse({ productId, price, title, img }).then(() =>
    res.redirect('/courses')
  );
});

export { addRouter };
