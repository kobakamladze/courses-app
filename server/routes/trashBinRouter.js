import express from 'express';
import { addCourse, deleteCourse } from '../models/coursesModel.js';

import {
  addToTrash,
  deleteFromTrash,
  getAllTrashElements,
} from '../models/trashBinModel.js';

const trashBinRouter = express.Router();

trashBinRouter.get('/', (req, res) => {
  return getAllTrashElements().then(trashList =>
    res.status(200).render('trash', { trashList })
  );
});

trashBinRouter.post('/add/:id', (req, res) => {
  const courseId = req.params.courseId;
  console.log(courseId);

  return addToTrash(courseId)
    .then(() => deleteCourse(courseId))
    .then(() => {
      return res.redirect('/trash');
    })
    .catch(err => {
      if (err) console.log(err);
      return res.render('error');
    });
});

trashBinRouter.post('/delete/:courseId', (req, res) => {
  const courseId = req.query.courseId;
  return deleteFromTrash(courseId)
    .then(() => res.redirect('/'))
    .catch(err => {
      if (err) console.log(err);
      return res.redirect('/');
    });
});

trashBinRouter.post('/recover/:courseId', (req, res) => {
  const { courseId } = req.params;
  const { title, img, price } = req.query;

  return addCourse({ title, img, price, courseId })
    .then(() => deleteFromTrash(courseId))
    .then(() => res.redirect('/courses'))
    .catch(err => {
      if (err) console.log(err);
      return res.redirect('/');
    });
});

export { trashBinRouter };
