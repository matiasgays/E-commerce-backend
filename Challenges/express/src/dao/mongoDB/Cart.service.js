import cartModel from "./models/cart.model.js";
import productModel from "./models/product.model.js";
import { isPremiumUser } from "../../utils/utils.js";

class Cart {
  constructor() {}

  getCart = async () => {
    try {
      const mongoRes = await cartModel.find();
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  getCartById = async (cid) => {
    try {
      const mongoRes = await cartModel
        .find({ _id: cid })
        .populate("products.product");
      if (!mongoRes) return { code: 400, payload: error };
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  updateCartById = async (cid, cart) => {
    try {
      let msg = "";
      const cartFound = await cartModel.findById(cid);
      cart.forEach(async (pid) => {
        let pidInCart = cartFound.products.find(
          (p) => p.id === pid.product._id
        );
        if (pidInCart) {
          try {
            const update = { "products.$[elem].quantity": pid.quantity };
            const mongoRes = await cartModel.updateOne({ _id: cid }, update, {
              arrayFilters: [{ "elem.product": pid.id }],
            });
            return { payload: mongoRes };
          } catch (error) {
            return { code: 500, payload: error };
          }
        } else {
          return { code: 404, payload: `Could not found ${pid.id}` };
        }
      });
      return { payload: msg };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  deleteCartById = async (cid) => {
    try {
      const mongoRes = await cartModel.findByIdAndRemove(cid);
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  addProductInCart = async (cart, user) => {
    const { id, quantity } = cart.products[0];
    if (!id || !quantity)
      return { code: 400, payload: `Could not found ${pid.id}` };
    try {
      if (isPremiumUser(user)) {
        const product = await productModel.findById(id);
        if (product.owner === user.email)
          return {
            code: 401,
            payload:
              "Can not add product in cart. You are the owner of the product",
          };
      }
      const mongoRes = await cartModel.create({
        products: { quantity, product: id },
      });
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  addProductInCartById = async (cid, pid, user) => {
    try {
      const cartFound = await cartModel.findById(cid);
      const pidInCart = cartFound.products.find((p) => {
        let id = p.product.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        return id === pid;
      });
      if (pidInCart) {
        try {
          if (isPremiumUser(user)) {
            const product = await productModel.findById(pid);
            if (product.owner === user.email) {
              return {
                code: 401,
                payload:
                  "Can not add product in cart. You are the owner of the product",
              };
            }
          }
          const update = { $inc: { "products.$[elem].quantity": 1 } };
          const mongoRes = await cartModel.updateOne({ _id: cid }, update, {
            arrayFilters: [{ "elem.product": pid }],
          });
          return { payload: mongoRes };
        } catch (error) {
          return { code: 500, payload: error };
        }
      } else {
        try {
          const insert = { $push: { products: { product: pid, quantity: 1 } } };
          const mongoRes = await cartModel.updateOne({ _id: cid }, insert);
          return { payload: mongoRes };
        } catch (error) {
          return { code: 500, payload: error };
        }
      }
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  updateProductInCartById = async (cid, pid, quantity) => {
    try {
      const cartFound = await cartModel.findById(cid);
      const pidInCart = cartFound.products.find((p) => {
        let id = p.product.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        return id === pid;
      });
      if (pidInCart) {
        try {
          const update = { "products.$[elem].quantity": quantity };
          const mongoRes = await cartModel.updateOne({ _id: cid }, update, {
            arrayFilters: [{ "elem.product": pid }],
          });
          return { payload: mongoRes };
        } catch (error) {
          return { code: 500, payload: error };
        }
      } else {
        return { code: 500, payload: error };
      }
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  deleteProductInCartById = async (cid, pid) => {
    try {
      const del = { $pull: { products: { product: pid } } };
      const mongoRes = await cartModel.updateOne({ _id: cid }, del);
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };
}

export default Cart;
