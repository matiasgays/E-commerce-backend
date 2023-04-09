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
    this.getPublic("/", ["PUBLIC"], getProducts);

    this.getPublic(
      "/:pid((?!(mockingproducts)w+))",
      ["PUBLIC"],
      getProductById
    );

    this.getPublic("/mockingproducts", ["PUBLIC"], mockingProducts);

    this.post("/", ["ADMIN"], addProduct);

    this.put("/:pid", ["ADMIN"], updateProduct);

    this.delete("/:pid", ["ADMIN"], deleteProduct);
  }
}

export default ProductsRouter;
