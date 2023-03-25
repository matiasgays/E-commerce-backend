import express from "express";
import {
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:pid", getProductById);

productsRouter.post("/", addProduct);

productsRouter.put("/:pid", updateProduct);

productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
