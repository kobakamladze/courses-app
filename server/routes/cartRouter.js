import express from "express";

import { addToCart, cartList, removeFromCart } from "../models/cartModel.js";

const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
  console.log("CART LIST === " + JSON.stringify(cartList));

  res.render("cart", { cartList });
});

cartRouter.post("/add/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  return addToCart(courseId)
    .then(() => res.redirect("/cart"))
    .catch((err) => {
      if (err) {
        return res.status(404);
      }
    });
});

cartRouter.post("/remove/:courseId", (req, res) => {
  const courseId = req.query.courseId;
  return removeFromCart(courseId).then(() => res.redirect("/cart"));
});

export { cartRouter };
