import express from "express";
import userModel from "../models/userModel.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.render("login", { style: "login.css" });
  });
});

loginRouter.post("/", passport.authenticate("signup", {}), async (req, res) => {
  console.log(hello);
  return res.status(200).json({ message: "Authentication succed" });
});

export default loginRouter;
