import express from "express";
import { addCourse, deleteCourse } from "../models/coursesModel.js";

import {
  trashList,
  addToTrash,
  deleteFromTrash,
} from "../models/trashBinModel.js";

const trashBinRouter = express.Router();

trashBinRouter.get("/", (req, res) => {
  return res.status(200).render("trash", { trashList });
});

trashBinRouter.post("/add/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  return addToTrash(courseId)
    .then(() => deleteCourse(courseId))
    .then(() => res.redirect("/trash"))
    .catch((err) => (err ? console.log(err) : false));
});

trashBinRouter.post("/delete/:courseId", (req, res) => {
  const courseId = req.query.courseId;
  return deleteFromTrash(courseId)
    .then(() => res.redirect("/"))
    .catch((err) => (err ? console.log(err) : false));
});

trashBinRouter.post("/recover/:courseId", (req, res) => {
  const { courseId } = req.params;
  const { title, img, price } = req.query;

  console.log("Course Id === " + courseId);

  return addCourse({ title, img, price, idParam: courseId })
    .then(() => deleteFromTrash(courseId))
    .then(() => res.redirect("/courses"))
    .catch((err) => (err ? console.log(err) : false));
});

export { trashBinRouter };
