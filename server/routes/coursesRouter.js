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

  console.log(JSON.stringify(req.params));
  console.log(JSON.stringify(courseFoundById));

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

  console.log("ID === " + id);

  return res.render("courseEdit", { id, img, title });
});

coursesRouter.put("/:courseId/edit", (req, res) => {
  const courseId = +req.params.courseId;
  const courseFoundById = findCourseById(courseId);

  console.log(JSON.stringify(courseId));
  console.log(JSON.stringify(courseFoundById));
  console.log("PARAMS === " + JSON.stringify(req.params));

  const { price: oldPrice, img: oldImg, titel: oldTitle } = courseFoundById;
  const { price: newPrice, img: newImg, titel: newTitle } = req.body;

  courseFoundById.price = newPrice ? newPrice : oldPrice;
  courseFoundById.title = newTitle ? newTitle : oldTitle;
  courseFoundById.img = newImg ? newImg : oldImg;

  res.render("courses");
});

export { coursesRouter };
