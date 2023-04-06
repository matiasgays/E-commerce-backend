import passport from "passport";
import jwt from "jsonwebtoken";
import Routers from "./router.js";

class LoginRouter extends Routers {
  init() {
    this.getLogin("/", ["PUBLIC"], (req, res) => {
      return res.render("login", { style: "login.css" });
    });

    this.postLogin(
      "/",
      ["PUBLIC"],
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

    this.getLogin(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["user:email"] }),
      async (req, res) => {}
    );

    this.getLogin(
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
