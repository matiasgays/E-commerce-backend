import {
  getCart,
  getCartById,
  addProductInCart,
  addProductInCartById,
  updateCartById,
  updateProductInCartById,
  deleteCartById,
  deleteProductInCartById,
} from "../controllers/cart.controller.js";
import { getTicket, createTicket } from "../controllers/ticket.controller.js";
import Routers from "./router.js";

class CartRouter extends Routers {
  init() {
    this.get("/", ["USER"], getCart);

    this.get("/:cid/json", ["USER"], getCartById);

    this.get("/:cid", ["USER"], (req, res, next) => {
      res.render("cart", { style: "cart.css" });
    });

    this.get("/:cid/purchase/:ticket", ["USER"], (req, res, next) => {
      res.render("ticket", {});
    });

    this.post("/:cid/purchase/:ticket", ["USER"], getTicket);

    this.post("/:cid/purchase", ["USER"], createTicket);

    this.post("/", ["USER"], addProductInCart);

    this.post("/:cid/product/:pid", ["USER"], addProductInCartById);

    this.put("/:cid", ["USER"], updateCartById);

    this.put("/:cid/product/:pid", ["USER"], updateProductInCartById);

    this.delete("/:cid", ["USER"], deleteCartById);

    this.delete("/:cid/product/:pid", ["USER"], deleteProductInCartById);
  }
}

export default CartRouter;
