import { v4 as uuid } from 'uuid';
import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  courseId: { type: String, default: uuid.v4, required: true },
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
});

const Course = model('Course', courseSchema);

// const coursesList = [
//   {
//     title: 'Node JS',
//     price: 60,
//     img: 'https://ih1.redbubble.net/image.1637717834.1604/aps,504x498,small,transparent-pad,600x600,f8f8f8.u1.jpg',
//     id: uuid(),
//   },
// ];

function addCourse({ courseId, title, price, img }) {
  const course = new Course({ courseId, title, price, img });

  // Set uuid if was not sent
  courseId = courseId ? courseId : uuid;

  return course.save().catch(err => {
    console.log(err);
  });
}

function deleteCourse(id) {
  return Course.deleteOne({ _id: id }).catch(err => {
    console.log(err);
  });
}

function getAllCourses() {
  return Course.find().then(res => res);
}

export { addCourse, deleteCourse, getAllCourses, Course };
