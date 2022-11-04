import { v4 as uuid } from 'uuid';
import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
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

const coursesList = [
  {
    title: 'Node JS',
    price: 60,
    img: 'https://ih1.redbubble.net/image.1637717834.1604/aps,504x498,small,transparent-pad,600x600,f8f8f8.u1.jpg',
    id: uuid(),
  },
];

function addCourse({ title, price, img, idParam }) {
  // const id = idParam ? idParam : uuid();
  // const newCourse = { title, price, img, id };
  // coursesList.push(newCourse);
  // return Promise.resolve();

  const course = new Course({ title, price, img });
  console.log(course);
  return course
    .save()
    .then(res => {
      console.log(JSON.stringify(res));
    })
    .catch(err => {
      console.log(err);
    });
}

function deleteCourse(id) {
  const indexOfCourseToRemove = coursesList.findIndex(
    course => course.id === id
  );

  if (indexOfCourseToRemove === -1) {
    return Promise.reject();
  }

  coursesList.splice(indexOfCourseToRemove, 1);

  return Promise.resolve();
}

export { addCourse, coursesList, deleteCourse };
