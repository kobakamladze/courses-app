import { getCourseById } from "../routes/coursesRouter.js";

const trashList = [];

function addToTrash(id) {
  const courseToAddToCart = getCourseById(id);

  const courseMatch = trashList.findIndex((course) => course.id === id);
  if (courseMatch !== -1) {
    console.error("Course is already added to trash bin!");
    return null;
  }

  trashList.push(courseToAddToCart);

  return Promise.resolve();
}

function deleteFromTrash(id) {
  const indexOfRemovableCourse = trashList.findIndex(
    (course) => course.id === id
  );

  trashList.splice(indexOfRemovableCourse, 1);

  return Promise.resolve();
}

export { trashList, addToTrash, deleteFromTrash };
