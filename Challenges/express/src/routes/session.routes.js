import Routers from "./router.js";
import { passportCall, authorization } from "../utils.js";

class SessionRouter extends Routers {
  init() {
    this.get("/", ["USER"], authorization("user"), (req, res) => {
      const { firstName, lastName, age, user, admin } = req.user;
      const profile = {
        user,
        firstName,
        lastName,
        age,
        admin,
      };
      res.render("products", { style: "index.css", profile });
    });

    this.get("/current", ["USER"], authorization("user"), (req, res) => {
      res.send(req.user);
    });
  }
}

export default SessionRouter;
