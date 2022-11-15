import express from 'express';
import { signed } from '../middlware/authCheck.js';

import {
  Course,
  findCourseByIdAndUpdate,
  getAllCourses,
} from '../models/coursesModel.js';

const coursesRouter = express.Router();

function getCourseById(id) {
  return Course.findById(id);
}

coursesRouter.get('/', (req, res) =>
  getAllCourses()
    .then(coursesList => res.render('courses', { coursesList }))
    .finally()
);

coursesRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  return getCourseById(id)
    .then(({ img, title, price }) => {
      res.render('course', { img, title, price });
    })
    .finally();
});

coursesRouter.get('/:id/edit', signed, (req, res) => {
  if (!req.query.allow) {
    return res.render('error');
  }

  const id = req.params.id;
  return getCourseById(id)
    .then(({ img, title, price, _id, productId }) => {
      console.log({ img, title, price, _id, productId });
      return res.render('courseEdit', {
        img,
        title,
        price,
        id: _id,
        productId,
      });
    })
    .finally();
});

coursesRouter.post('/:id/edit', signed, (req, res) => {
  const id = req.params.id;
  const { price, img, title } = req.body;

  return findCourseByIdAndUpdate(id, { price, img, title })
    .then(() => res.redirect('/courses'))
    .finally();
});

export { coursesRouter, getCourseById };
