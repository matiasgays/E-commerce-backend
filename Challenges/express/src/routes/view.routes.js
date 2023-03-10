import express from "express";
import { passportCall, authorization } from "../utils.js";

const viewRouter = express.Router();

viewRouter.get(
  "/",
  passportCall("current"),
  authorization("user"),
  (req, res) => {
    const { firstName, lastName, age, user, admin } = req.user;
    const profile = {
      user,
      firstName,
      lastName,
      age,
      admin,
    };
    res.render("products", { style: "index.css", profile });
  }
);

// viewRouter.get("/:pid", (req, res) => {
//   res.render("productDetail", { style: "productDetail.css" });
// });

viewRouter.get("/cart/:cid", (req, res) => {
  res.render("cartId", { style: "cartId.css" });
});

export default viewRouter;
