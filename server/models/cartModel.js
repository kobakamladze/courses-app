import { getCourseById } from "../routes/coursesRouter.js";

const cartList = [];

function addToCart(id) {
  const courseToAddToCart = getCourseById(id);
  if (!courseToAddToCart) {
    console.error("Course could not be found.");
    return Promise.reject();
  }

  const matchedCourseIndex = cartList.findIndex((course) => course.id === id);
  if (matchedCourseIndex !== -1) {
    const macthedCourse = cartList[matchedCourseIndex];

    macthedCourse.quantity += 1;
    macthedCourse.price = Number(macthedCourse.price) * macthedCourse.quantity;

    return Promise.resolve();
  }

  cartList.push({ ...courseToAddToCart, quantity: 1 });

  return Promise.resolve();
}

function getTotalPrice() {
  if (!cartList.length) {
    return Promise.reject();
  }

  const coursesTotalPrice = cartList.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );

  return coursesTotalPrice;
}

function removeFromCart(id) {
  const indexOfRemovableCourse = cartList.findIndex(
    (course) => course.id === id
  );

  if (indexOfRemovableCourse === -1) {
    console.error("Course could not be found!");
    return Promise.reject();
  }

  cartList.splice(indexOfRemovableCourse, 1);

  return Promise.resolve();
}

export { cartList, addToCart, removeFromCart, getTotalPrice };
