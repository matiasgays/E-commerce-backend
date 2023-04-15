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
    this.get("/", ["USER"], getProducts);

    this.get("/:pid((?!(mockingproducts)w+))", ["USER"], getProductById);

    this.get("/mockingproducts", ["USER"], mockingProducts);

    this.post("/", ["ADMIN"], addProduct);

    this.put("/:pid", ["ADMIN"], updateProduct);

    this.delete("/:pid", ["ADMIN"], deleteProduct);
  }
}

export default ProductsRouter;
