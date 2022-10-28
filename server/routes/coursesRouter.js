import express from "express";

const coursesRouter = express.Router();

coursesRouter.get("/", (req, res) =>
  res.render("courses", { title: "All Courses" })
);

export { coursesRouter };
