import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  return res.render("login", { style: "login.css" });
});

loginRouter.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { firstName, lastName, email, password, role } = req.user;
    let token = jwt.sign(
      { firstName, lastName, email, password, role },
      "mello",
      {
        expiresIn: "24h",
      }
    );
    return res
      .status(201)
      .cookie("mello", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
      .send({ message: "Logged in successfully" });
  }
);

loginRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

loginRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    res.redirect("/");
  }
);

export default loginRouter;
