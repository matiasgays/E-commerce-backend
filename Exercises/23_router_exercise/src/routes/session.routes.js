import Routers from "./router.js";
import jwt from "jsonwebtoken";

class SessionRouter extends Routers {
  init() {
    this.post("/login", ["PUBLIC"], (req, res) => {
      let user = {
        email: req.body.email,
        role: "user",
      };
      let token = jwt.sign(user, "mello");
      res.sendSuccess({ token });
    });
  }
}

export default SessionRouter;
