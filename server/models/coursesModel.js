import { v4 as uuid } from "uuid";

const coursesList = [
  {
    title: "Node JS",
    price: "60$",
    img: "https://ih1.redbubble.net/image.1637717834.1604/aps,504x498,small,transparent-pad,600x600,f8f8f8.u1.jpg",
    id: 1,
  },
];

function course({ title, price, img }) {
  const newCourse = { title, price, img, id: uuid() };

  coursesList.push(newCourse);

  const recentlyAddedCourse = coursesList.find(
    (course) => course.id === newCourse.id
  );

  return recentlyAddedCourse;
}

export { course, coursesList };
