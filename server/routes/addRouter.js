import express from "express";

import { course } from "../models/coursesModel.js";

const addRouter = express.Router();

addRouter.get("/", (req, res) => res.render("add", { title: "Add Course" }));
addRouter.post("/", (req, res) => {
  const { img, price, title } = req.body;
  course({ img, price: `${price}$`, title });

  return res.redirect("/courses");
});

export { addRouter };
