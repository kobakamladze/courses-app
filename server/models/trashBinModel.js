import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { getCourseById } from '../routes/coursesRouter.js';
import { Course } from './coursesModel.js';

const trashSchema = new Schema({
  courseId: { type: String, default: uuid.v4 },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

const Trash = model('Trash', trashSchema);

function getAllTrashElements() {
  return Trash.find();
}

function addToTrash(id) {
  return Course.findById(id).then(({ title, price, img }) => {
    const trashElement = new Trash({ title, price, img });
    return trashElement.save();
  });
}

function deleteFromTrash(id) {
  console.log('ID PARAM === ' + id);

  return Trash.findByIdAndDelete(id).then(course =>
    console.log('DELETED FROM TRASH === ' + JSON.stringify(course))
  );
}

export { addToTrash, deleteFromTrash, getAllTrashElements, Trash };
