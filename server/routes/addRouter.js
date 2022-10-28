import express from "express";

import { Course } from "../models/coursesModel.js";

const addRouter = express.Router();

addRouter.get("/", (req, res) => res.render("add", { title: "Add Course" }));
addRouter.post("/", (req, res) => {
  const { img, price, title } = req.body;

  const newCourse = new Course({ img, price, title });

  res.send(JSON.stringify(newCourse));
});

export { addRouter };
