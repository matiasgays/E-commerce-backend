import express from "express";
import passport from "passport";

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
    getSessions(req);
    return res.status(201).send();
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

export default loginRouter;

function getSessions(req) {
  const { email, firstName, lastName, age } = req.user;
  req.session.user = email;
  req.session.firstName = firstName;
  req.session.lastName = lastName;
  req.session.age = age;
  req.session.admin = email === "adminCoder@coder.com";
}
