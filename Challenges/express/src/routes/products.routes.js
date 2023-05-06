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
    this.get("/", ["USER", "USER_PREMIUM", "ADMIN"], getProducts);

    this.get(
      "/:pid([a-zA-Z0-9]{24})",
      ["USER", "USER_PREMIUM", "ADMIN"],
      getProductById
    );

    this.get(
      "/mockingproducts",
      ["USER", "USER_PREMIUM", "ADMIN"],
      mockingProducts
    );

    this.post("/", ["USER_PREMIUM", "ADMIN"], addProduct);

    this.put("/:pid", ["USER_PREMIUM", "ADMIN"], updateProduct);

    this.delete("/:pid", ["USER_PREMIUM", "ADMIN"], deleteProduct);
  }
}

export default ProductsRouter;
