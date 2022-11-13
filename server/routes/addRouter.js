import express from 'express';

import authCheck from '../middlware/authCheck.js';
import { addCourse } from '../models/coursesModel.js';

const addRouter = express.Router();

addRouter.get('/', authCheck, (req, res) =>
  res.render('add', { title: 'Add Course' })
);
addRouter.post('/', authCheck, (req, res) => {
  const { productId, img, price, title } = req.body;
  return addCourse({ productId, price, title, img }).then(() =>
    res.redirect('/courses')
  );
});

export { addRouter };
