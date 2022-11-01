import express from "express";

import { addCourse } from "../models/coursesModel.js";

const addRouter = express.Router();

addRouter.get("/", (req, res) => res.render("add", { title: "Add Course" }));
addRouter.post("/", (req, res) => {
  const { img, price, title } = req.body;
  return addCourse({ img, price: `${price}$`, title }).then(() =>
    res.redirect("/courses")
  );
});

export { addRouter };
