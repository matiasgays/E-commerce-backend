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
    this.get("/", ["USER", "USER_PREMIUM"], getCart);

    this.get("/:cid/json", ["USER", "USER_PREMIUM"], getCartById);

    this.get("/:cid", ["USER", "USER_PREMIUM"], (req, res, next) => {
      res.render("cart", { style: "cart.css" });
    });

    this.get(
      "/:cid/purchase/:ticket",
      ["USER", "USER_PREMIUM"],
      (req, res, next) => {
        res.render("ticket", {});
      }
    );

    this.post("/:cid/purchase/:ticket", ["USER", "USER_PREMIUM"], getTicket);

    this.post("/:cid/purchase", ["USER", "USER_PREMIUM"], createTicket);

    this.post("/", ["USER", "USER_PREMIUM"], addProductInCart);

    this.post(
      "/:cid/product/:pid",
      ["USER", "USER_PREMIUM"],
      addProductInCartById
    );

    this.put("/:cid", ["USER", "USER_PREMIUM"], updateCartById);

    this.put(
      "/:cid/product/:pid",
      ["USER", "USER_PREMIUM"],
      updateProductInCartById
    );

    this.delete("/:cid", ["USER", "USER_PREMIUM"], deleteCartById);

    this.delete(
      "/:cid/product/:pid",
      ["USER", "USER_PREMIUM"],
      deleteProductInCartById
    );
  }
}

export default CartRouter;
