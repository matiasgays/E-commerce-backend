import express from "express";
import passport from "passport";

const sessionRouter = express.Router();

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    res.redirect("/");
  }
);

export default sessionRouter;
