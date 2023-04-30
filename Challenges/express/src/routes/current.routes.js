import UserDTO from "../dao/DTO/user.dto.js";
import Routers from "./router.js";

class CurrentRouter extends Routers {
  init() {
    this.get("/", ["USER", "USER_PREMIUM", "ADMIN"], (req, res) => {
      const profile = new UserDTO(req.user);
      res.render("products", { style: "products.css", profile });
    });

    this.get("/product/:pid", ["USER", "USER_PREMIUM", "ADMIN"], (req, res) => {
      res.render("productDetail", { style: "productDetail.css" });
    });

    this.get("/cart/:cid", ["USER", "USER_PREMIUM", "ADMIN"], (req, res) => {
      res.render("shoppingCart", { style: "cartId.css" });
    });

    this.get("/loggerTest", ["USER", "USER_PREMIUM", "ADMIN"], (req, res) => {
      // To list all loggers, ENVIRONMENT = dev in ".env" folder
      const log = `${req.method} in ${
        req._parsedOriginalUrl.pathname
      } - ${new Date().toLocaleTimeString()}`;
      req.logger.debug(log);
      req.logger.http(log);
      req.logger.info(log);
      req.logger.warning(log);
      req.logger.error(log);
      req.logger.fatal(log);
      res.send({ status: 200, payload: "logger Test" });
    });
  }
}

export default CurrentRouter;
