import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { passportCall, authorization } from "../utils.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    return res.render("login", { style: "login.css" });
  });
});

loginRouter.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    // getSessions(req);
    const { email, password } = req.user;
    let token = jwt.sign({ email, password, role: "user" }, "mello", {
      expiresIn: "24h",
    });
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
    getSessions(req);
    res.redirect("/");
  }
);

loginRouter.get(
  "/current",
  passportCall("jwt"),
  authorization("user"),
  (req, res) => {
    res.send(req.user);
  }
);

export default loginRouter;

function getSessions(req) {
  const { email, firstName, lastName, age } = req.user;
  req.session.user = email;
  req.session.firstName = firstName;
  req.session.lastName = lastName;
  req.session.age = age;
  req.session.admin = email === "adminCoder@coder.com";
}
