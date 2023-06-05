import passport from "passport";
import jwt from "jsonwebtoken";
import Routers from "./router.js";
import userModel from "../dao/mongoDB/models/user.model.js";

class LoginRouter extends Routers {
  init() {
    this.get("/", ["PUBLIC"], (req, res) => {
      return res.render("login", { style: "login.css" });
    });

    this.get("/logout", ["USER", "USER_PREMIUM"], async (req, res) => {
      await userModel.findOneAndUpdate(
        { email: req.user.email },
        { $set: { lastConnection: new Date() } }
      );
      return res.status(200).send();
    });

    this.post("/", ["PUBLIC"], passport.authenticate("login"), signCookie);

    this.get(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["user:email"] }),
      async (req, res) => {}
    );

    this.get(
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
  if (!req.user) {
    return res.status(401).redirect("/login");
  }
  const { firstName, lastName, email, password, role, cartId } = req.user;
  let token = jwt.sign(
    { firstName, lastName, email, password, role, cartId },
    "mello",
    {
      expiresIn: "24h",
    }
  );
  return res
    .cookie("mello", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .sendSuccess({});
};
