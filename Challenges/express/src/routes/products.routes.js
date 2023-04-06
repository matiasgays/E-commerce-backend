import {
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/products.controller.js";
import Routers from "./router.js";

class ProductsRouter extends Routers {
  init() {
    this.get("/", ["PUBLIC"], getProducts);

    this.get("/:pid", ["PUBLIC"], getProductById);

    this.post("/", ["ADMIN"], addProduct);

    this.put("/:pid", ["ADMIN"], updateProduct);

    this.delete("/:pid", ["ADMIN"], deleteProduct);
  }
}

export default ProductsRouter;
