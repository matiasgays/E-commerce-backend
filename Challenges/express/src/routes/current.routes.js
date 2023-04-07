import { passportCall, authorization } from "../utils.js";
import UserDTO from "../dao/DTO/user.dto.js";
import Routers from "./router.js";

class CurrentRouter extends Routers {
  init() {
    this.get("/", passportCall("current"), authorization(), (req, res) => {
      const profile = new UserDTO(req.user);
      res.render("products", { style: "index.css", profile });
    });

    this.get("/product/:pid", (req, res) => {
      res.render("productDetail", { style: "productDetail.css" });
    });

    this.get("/cart/:cid", (req, res) => {
      res.render("shoppingCart", { style: "cartId.css" });
    });
  }
}

export default CurrentRouter;
