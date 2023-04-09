import passport from "passport";
import jwt from "jsonwebtoken";
import Routers from "./router.js";

class LoginRouter extends Routers {
  init() {
    this.getPublic("/", ["PUBLIC"], (req, res) => {
      return res.render("login", { style: "login.css" });
    });

    this.postPublic(
      "/",
      ["PUBLIC"],
      passport.authenticate("login", { failureRedirect: "/login" }),
      signCookie
    );

    this.getPublic(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["user:email"] }),
      async (req, res) => {}
    );

    this.getPublic(
      "/githubcallback",
      ["PUBLIC"],
      passport.authenticate("github", { failureRedirect: "/login" }),
      async (req, res) => {
        res.redirect("/");
      }
    );
  }
}

export default LoginRouter;

const signCookie = (req, res) => {
  const { firstName, lastName, email, password, role } = req.user;
  let token = jwt.sign(
    { firstName, lastName, email, password, role },
    "mello",
    {
      expiresIn: "24h",
    }
  );
  return res
    .cookie("mello", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .sendSuccess({});
};
