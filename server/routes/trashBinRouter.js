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
    .then(() => res.render("trash", { trashList }))
    .catch((err) => (err ? console.log(err) : false));
});

trashBinRouter.post("/delete/:courseId", (req, res) => {
  const courseId = req.query.courseId;
  return deleteFromTrash(courseId)
    .then(() => res.render("trash", { trashList }))
    .catch((err) => (err ? console.log(err) : false));
});

trashBinRouter.post("/recover/:courseId", (req, res) => {
  const courseId = req.params.courseId;

  const { title, img, price } = req.query;

  return addCourse({ title, img, price })
    .then(() => deleteFromTrash(courseId))
    .then(() => res.render("trash", { trashList }))
    .catch((err) => (err ? console.log(err) : false));
});

export { trashBinRouter };
