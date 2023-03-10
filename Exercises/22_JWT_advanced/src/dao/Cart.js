import cartModel from "./models/cartModel.js";

class Cart {
  getCart = async () => {
    try {
      const mongoRes = await cartModel.find();
      return { message: "Cart found", payload: mongoRes };
    } catch (error) {
      throw new Error("Server failed to find cart");
    }
  };

  getCartById = async (cid) => {
    try {
      const mongoRes = await cartModel
        .find({ _id: cid })
        .populate("products.product");
      return { message: "cid found", payload: mongoRes };
    } catch (error) {
      throw new Error("Could not found cid");
    }
  };

  updateCartById = async (cid, array) => {
    try {
      let msg = "";
      const mongoRes = await cartModel.findById(cid);
      array.forEach(async (pid) => {
        let pidInCart = mongoRes.products.find((p) => p.id === pid.id);
        if (pidInCart) {
          try {
            const update = { "products.$[elem].quantity": pid.quantity };
            await cartModel
              .updateOne({ _id: cid }, update, {
                arrayFilters: [{ "elem.product": pid.id }],
              })
              .then((msg += `${pid.id} successfully updated. `));
          } catch (error) {
            throw new Error("Server failed to update pid in cart");
          }
        } else {
          msg += `Could not found ${pid.id}`;
        }
      });
      return { message: msg };
    } catch (error) {
      throw new Error("Could not found cid");
    }
  };

  deleteCartById = async (cid) => {
    try {
      await cartModel.findByIdAndRemove(cid);
      return { message: "Cart successfully deleted" };
    } catch (error) {
      throw new Error("Could not found cid");
    }
  };

  addProductInCart = async (cart) => {
    const { id, quantity } = cart.products[0];
    if (!id || !quantity)
      return { error: 1, message: "arguments can't be falsy" };

    try {
      await cartModel.create({
        products: { quantity, product: id },
      });
      return { error: 0, message: "product successfully added" };
    } catch (error) {
      throw new Error("Server failed to add product to cart");
    }
  };

  addProductInCartById = async (cid, pid) => {
    try {
      const mongoRes = await cartModel.findById(cid);
      const pidInCart = mongoRes.products.find((p) => {
        let id = p.product.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        return id === pid;
      });
      if (pidInCart) {
        try {
          const update = { $inc: { "products.$[elem].quantity": 1 } };
          await cartModel.updateOne({ _id: cid }, update, {
            arrayFilters: [{ "elem.product": pid }],
          });
          return {
            message:
              "Product is already in cart.  Product's quantity +1 successfully added",
          };
        } catch (error) {
          throw new Error("Server failed to update pid in cart");
        }
      } else {
        try {
          const insert = { $push: { products: { product: pid, quantity: 1 } } };
          await cartModel.updateOne({ _id: cid }, insert);
          return { message: "Product successfully added to cart" };
        } catch (error) {
          throw new Error("Server failed to add product to cart");
        }
      }
    } catch (error) {
      throw new Error("Could not found cid");
    }
  };

  updateProductInCartById = async (cid, pid, quantity) => {
    try {
      const mongoRes = await cartModel.findById(cid);
      const pidInCart = mongoRes.products.find((p) => {
        let id = p.product.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        return id === pid;
      });
      if (pidInCart) {
        try {
          const update = { "products.$[elem].quantity": quantity };
          await cartModel.updateOne({ _id: cid }, update, {
            arrayFilters: [{ "elem.product": pid }],
          });
          return {
            error: 0,
            message: `Product is already in cart.  Product's quantity ${quantity} successfully added`,
          };
        } catch (error) {
          throw new Error("Server failed to update pid in cart");
        }
      } else {
        return { error: 1, message: "Could not found pid" };
      }
    } catch (error) {
      throw new Error("Could not found cid");
    }
  };

  deleteProductInCartById = async (cid, pid) => {
    try {
      const mongoRes = await cartModel.findById(cid);
      const pidInCart = mongoRes.products.find((p) => p.id === pid);
      if (pidInCart) {
        try {
          const del = { $pull: { products: { id: pid } } };
          await cartModel.updateOne({ _id: cid }, del);
          return {
            error: 0,
            message: "Product successfully deleted from cart",
          };
        } catch (error) {
          throw new Error("Server failed to delete pid in cart");
        }
      } else {
        return { error: 1, message: "Could not found pid" };
      }
    } catch (error) {
      throw new Error("Could not found cid");
    }
  };
}

export default Cart;
