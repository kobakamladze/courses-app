import express from "express";

import { addToCart, cartList, removeFromCart } from "../models/cartModel.js";
import { getTotalPrice } from "../models/cartModel.js";

const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
  const totalPrice = getTotalPrice();
  res.render("cart", { cartList, totalPrice });
});

cartRouter.post("/add/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  return addToCart(courseId)
    .then(() => res.redirect("/cart"))
    .catch((err) => {
      if (err) console.log(err);
      return res.redirect("/");
    });
});

cartRouter.post("/remove/:courseId", (req, res) => {
  const { courseId } = req.params;

  return removeFromCart(courseId)
    .then(() => res.redirect("/cart"))
    .catch((err) => {
      if (err) console.log(err);
      return res.render("error", { error: err });
    });
});

export { cartRouter };
