import {
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  mockingProducts,
} from "../controllers/products.controller.js";
import Routers from "./router.js";

class ProductsRouter extends Routers {
  init() {
    this.get("/", ["PUBLIC"], getProducts);

    this.get("/:pid((?!(mockingproducts)w+))", ["PUBLIC"], getProductById);

    this.get("/mockingproducts", ["PUBLIC"], mockingProducts);

    this.post("/", ["ADMIN"], addProduct);

    this.put("/:pid", ["ADMIN"], updateProduct);

    this.delete("/:pid", ["ADMIN"], deleteProduct);
  }
}

export default ProductsRouter;
