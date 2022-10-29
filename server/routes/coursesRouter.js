import express from "express";

import { course, coursesList } from "../models/coursesModel.js";

const coursesRouter = express.Router();

function findCourseById(courseId) {
  return coursesList.find((course) => course.id === courseId);
}

coursesRouter.get("/", (req, res) =>
  res.render("courses", { title: "All Courses", coursesList })
);

coursesRouter.get("/:courseId", (req, res) => {
  const courseId = +req.params.courseId;
  const courseFoundById = findCourseById(courseId);
  const { img, title, price } = courseFoundById;

  res.render("course", { img, title, price });
});

coursesRouter.get("/:courseId/edit", (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  const courseId = +req.params.courseId;
  const courseFoundById = findCourseById(courseId);
  const { id, img, title } = courseFoundById;

  return res.render("courseEdit", { id, img, title });
});

coursesRouter.post("/:courseId/edit", (req, res) => {
  const courseId = +req.params.courseId;
  const courseFoundById = findCourseById(courseId);

  const { price: oldPrice, img: oldImg, title: oldTitle } = courseFoundById;
  const { price: newPrice, img: newImg, title: newTitle } = req.body;

  console.log("COURSE ID === " + courseId);
  console.log("COURSE === " + JSON.stringify(courseFoundById));

  console.log("NEW TITLE === " + newTitle);
  console.log("OLD TITLE === " + oldTitle);
  console.log("NEW PRICE === " + newPrice);
  console.log("OLD PRICE === " + oldPrice);
  console.log("NEW IMG === " + newImg);
  console.log("OLD IMG === " + oldImg);

  courseFoundById.price = newPrice ? newPrice : oldPrice;
  courseFoundById.title = newTitle ? newTitle : oldTitle;
  courseFoundById.img = newImg ? newImg : oldImg;

  res.redirect("/courses");
});

export { coursesRouter };
