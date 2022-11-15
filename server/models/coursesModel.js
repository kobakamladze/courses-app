import { v4 as uuid } from 'uuid';
import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  productId: { type: String, default: uuid.v4, required: true },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
});

const Course = model('Course', courseSchema);

function addCourse({ productId, title, price, img }) {
  // Set uuid if was not sent
  productId = productId ? productId : uuid();

  const course = new Course({ productId, title, price, img });

  return course.save().catch(err => {
    console.log(err);
  });
}

function deleteCourse(id) {
  return Course.deleteOne({ _id: id })
    .catch(err => {
      console.log(err);
    })
    .finally();
}

function getAllCourses() {
  return Course.find()
    .then(res => res)
    .finally();
}

function findCourseByIdAndUpdate(id, params) {
  return Course.findByIdAndUpdate(id, { ...params }).finally();
}

export {
  addCourse,
  deleteCourse,
  getAllCourses,
  Course,
  findCourseByIdAndUpdate,
};
