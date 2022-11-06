import express from 'express';

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
  getAllCourses().then(coursesList => res.render('courses', { coursesList }))
);

coursesRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  return getCourseById(id).then(({ img, title, price }) => {
    res.render('course', { img, title, price });
  });
});

coursesRouter.get('/:id/edit', (req, res) => {
  if (!req.query.allow) {
    return res.render('error');
  }

  const id = req.params.id;
  return getCourseById(id).then(({ img, title, price, _id, productId }) => {
    console.log({ img, title, price, _id, productId });
    return res.render('courseEdit', { img, title, price, id: _id, productId });
  });
});

coursesRouter.post('/:id/edit', (req, res) => {
  const id = req.params.id;
  const { price, img, title } = req.body;

  return findCourseByIdAndUpdate(id, { price, img, title }).then(() =>
    res.redirect('/courses')
  );
});

export { coursesRouter, getCourseById };
