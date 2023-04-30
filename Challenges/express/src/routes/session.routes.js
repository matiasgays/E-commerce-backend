import Routers from "./router.js";

class SessionRouter extends Routers {
  init() {
    this.get("/", ["USER", "USER_PREMIUM", "ADMIN"], (req, res) => {
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

    this.get("/current", ["USER", "USER_PREMIUM", "ADMIN"], (req, res) => {
      res.send(req.user);
    });
  }
}

export default SessionRouter;
