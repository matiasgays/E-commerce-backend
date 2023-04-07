import cartModel from "./models/cart.model.js";

class Cart {
  constructor() {}

  getCart = async () => {
    try {
      const mongoRes = await cartModel.find();
      return { payload: mongoRes };
    } catch (error) {
      return { error };
    }
  };

  getCartById = async (cid) => {
    try {
      const mongoRes = await cartModel
        .find({ _id: cid })
        .populate("products.product");
      return { payload: mongoRes };
    } catch (error) {
      return { error };
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
            return { error };
          }
        } else {
          msg += `Could not found ${pid.id}`;
        }
      });
      return { payload: msg };
    } catch (error) {
      return { error };
    }
  };

  deleteCartById = async (cid) => {
    try {
      const mongoRes = await cartModel.findByIdAndRemove(cid);
      return { payload: mongoRes };
    } catch (error) {
      return { error };
    }
  };

  addProductInCart = async (cart) => {
    const { id, quantity } = cart.products[0];
    if (!id || !quantity) return { payload: "arguments can't be falsy" };

    try {
      const mongoRes = await cartModel.create({
        products: { quantity, product: id },
      });
      return { payload: mongoRes };
    } catch (error) {
      return { error };
    }
  };

  addProductInCartById = async (cid, pid) => {
    try {
      const cartFound = await cartModel.findById(cid);
      const pidInCart = cartFound.products.find((p) => {
        let id = p.product.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        return id === pid;
      });
      if (pidInCart) {
        try {
          const update = { $inc: { "products.$[elem].quantity": 1 } };
          const mongoRes = await cartModel.updateOne({ _id: cid }, update, {
            arrayFilters: [{ "elem.product": pid }],
          });
          return { payload: mongoRes };
        } catch (error) {
          return { error };
        }
      } else {
        try {
          const insert = { $push: { products: { product: pid, quantity: 1 } } };
          const mongoRes = await cartModel.updateOne({ _id: cid }, insert);
          return { payload: mongoRes };
        } catch (error) {
          return { error };
        }
      }
    } catch (error) {
      return { error };
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
          return { error };
        }
      } else {
        return { error };
      }
    } catch (error) {
      return { error };
    }
  };

  deleteProductInCartById = async (cid, pid) => {
    try {
      const del = { $pull: { products: { product: pid } } };
      const mongoRes = await cartModel.updateOne({ _id: cid }, del);
      return { payload: mongoRes };
    } catch (error) {
      return { error };
    }
  };
}

export default Cart;
