import express from "express";
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

const cartRouter = express.Router();

cartRouter.get("/", getCart);

cartRouter.get("/:cid", getCartById);

cartRouter.post("/", addProductInCart);

cartRouter.post("/:cid/product/:pid", addProductInCartById);

cartRouter.put("/:cid", updateCartById);

cartRouter.put("/:cid/product/:pid", updateProductInCartById);

cartRouter.delete("/:cid", deleteCartById);

cartRouter.delete("/:cid/product/:pid", deleteProductInCartById);

export default cartRouter;
