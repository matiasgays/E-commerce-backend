import express from "express";
import { passportCall, authorization } from "../utils.js";
import UserDTO from "../dao/DTO/user.dto.js";

const viewRouter = express.Router();

viewRouter.get("/", passportCall("current"), authorization(), (req, res) => {
  const profile = new UserDTO(req.user);
  res.render("products", { style: "index.css", profile });
});

viewRouter.get("/product/:pid", (req, res) => {
  res.render("productDetail", { style: "productDetail.css" });
});

viewRouter.get("/cart/:cid", (req, res) => {
  res.render("shoppingCart", { style: "cartId.css" });
});

export default viewRouter;
