import express from 'express';

import { removeFromCart } from '../models/cartModel.js';
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
  const id = req.params.id;
  console.log(id);

  return addToTrash(id)
    .then(() => removeFromCart(id))
    .then(() => deleteCourse(id))
    .then(() => {
      return res.redirect('/trash');
    })
    .catch(err => {
      if (err) console.log(err);
      return res.render('error');
    });
});

trashBinRouter.post('/delete/:id', (req, res) => {
  const id = req.query.id;
  return deleteFromTrash(id)
    .then(() => res.redirect('/'))
    .catch(err => {
      if (err) console.log(err);
      return res.redirect('/');
    });
});

trashBinRouter.post('/recover/:id', (req, res) => {
  const id = req.params.id;
  const { title, img, price, productId } = req.query;

  console.log({ id, title, img, price, productId });

  return addCourse({ title, img, price, productId })
    .then(() => deleteFromTrash(id))
    .then(() => res.redirect('/courses'))
    .catch(err => {
      if (err) console.log(err);
      return res.redirect('/');
    });
});

export { trashBinRouter };
