import express from "express";
import userModel from "../models/userModel.js";
import { createHash } from "../utils.js";
import passport from "passport";

const signupRouter = express.Router();

signupRouter.get("/", (req, res) => {
  res.render("signup", { style: "signup.css" });
});

signupRouter.post(
  "/",
  passport.authenticate("signup", {
    successRedirect: "/login",
    failureRedirect: "/signup",
    failureFlash: true,
    keepSessionInfo: true,
  })
);

export default signupRouter;
