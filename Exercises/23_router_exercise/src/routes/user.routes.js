import Routers from "./router.js";

class UserRouter extends Routers {
  init() {
    this.get("/", ["PUBLIC"], (req, res) => {
      res.sendSuccess("Hello public");
    });

    this.get("/currentUser", ["USER", "USER_PREMIUM"], (req, res) => {
      res.sendSuccess(req.user);
    });
  }
}

export default UserRouter;
