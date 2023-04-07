import passport from "passport";
import Routers from "./router.js";

class SignupRouter extends Routers {
  init() {
    this.get("/", ["PUBLIC"], (req, res) => {
      res.render("signup", { style: "signup.css" });
    });

    this.post(
      "/",
      ["PUBLIC"],
      passport.authenticate("signup", {
        failureRedirect: "/signup",
      }),
      (req, res) => {
        res.sendSuccess();
      }
    );
  }
}

export default SignupRouter;
