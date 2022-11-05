import express from 'express';

import { Course, getAllCourses } from '../models/coursesModel.js';

const coursesRouter = express.Router();

function getCourseById(courseId) {
  return Course.findById(courseId);
}

coursesRouter.get('/', (req, res) =>
  getAllCourses().then(coursesList => res.render('courses', { coursesList }))
);

coursesRouter.get('/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  return getCourseById(courseId).then(({ img, title, price }) => {
    res.render('course', { img, title, price });
  });
});

coursesRouter.get('/:courseId/edit', (req, res) => {
  if (!req.query.allow) {
    return res.render('error');
  }

  const courseId = req.params.courseId;
  return getCourseById(courseId).then(
    ({ img, title, price, _id, courseId }) => {
      console.log({ img, title, price, _id, courseId });
      return res.render('courseEdit', { img, title, price, id: _id, courseId });
    }
  );
});

coursesRouter.post('/:courseId/edit', (req, res) => {
  const courseId = req.params.courseId;
  const courseFoundById = getCourseById(courseId).then(
    ({ price: oldPrice, img: oldImg, title: oldTitle }) => {
      const { price: newPrice, img: newImg, title: newTitle } = req.body;

      courseFoundById.price = newPrice ? newPrice : oldPrice;
      courseFoundById.title = newTitle ? newTitle : oldTitle;
      courseFoundById.img = newImg ? newImg : oldImg;

      return res.redirect('/courses');
    }
  );
});

export { coursesRouter, getCourseById };
