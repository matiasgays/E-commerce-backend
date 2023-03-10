import express from "express";
import passport from "passport";

const signupRouter = express.Router();

signupRouter.get("/", (req, res) => {
  res.render("signup", { style: "signup.css" });
});

signupRouter.post(
  "/",
  passport.authenticate("signup", {
    failureRedirect: "/signup",
  }),
  (req, res) => {
    return res.status(201).send();
  }
);

export default signupRouter;
