import Routers from "./router.js";

class MessagesRouter extends Routers {
  init() {
    this.get("/", ["USER", "USER_PREMIUM", "ADMIN"], (req, res) => {
      res.render("chat", { style: "chat.css" });
    });
  }
}

export default MessagesRouter;
