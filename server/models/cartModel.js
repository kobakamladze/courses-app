import { getCourseById } from "../routes/coursesRouter.js";

const cartList = [];

function addToCart(id) {
  const courseToAddToCart = getCourseById(id);

  const courseMatch = cartList.findIndex((course) => course.id === id);
  if (courseMatch !== -1) {
    console.error("Course has already been added to cart!");
    return Promise.reject();
  }

  cartList.push(courseToAddToCart);

  return Promise.resolve();
}

function removeFromCart(id) {
  const indexOfRemovableCourse = cartList.findIndex(
    (course) => course.id === id
  );

  if (indexOfRemovableCourse === -1) {
    console.error("Course has already been added to cart!");
    return Promise.reject();
  }

  cartList.splice(indexOfRemovableCourse, 1);

  return Promise.resolve();
}

export { cartList, addToCart, removeFromCart };
