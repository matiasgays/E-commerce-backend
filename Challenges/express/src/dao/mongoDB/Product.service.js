import productModel from "./models/product.model.js";
import { isPremiumUser } from "../../utils/utils.js";

class Product {
  getProducts = async (limit, page, sort, qr) => {
    let query = {};
    if (qr) {
      const { category, stock } = JSON.parse(qr);
      if (category) query.category = category;
      if (stock) query.stock = stock;
    }
    let order;
    switch (sort) {
      case "desc":
        order = -1;
        break;
      default:
        order = 1;
    }
    const options = {
      limit,
      page,
      sort: { price: order },
    };
    try {
      const mongoRes = await productModel.paginate(query, options);
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  getProductById = async (pid) => {
    try {
      const mongoRes = await productModel.findById(pid);
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  addProduct = async (product, user) => {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = product;

    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !category ||
      !code ||
      !stock ||
      !status
    )
      return { code: 400, payload: "arguments can't be falsy" };

    try {
      let mongoRes = await productModel.findOne({ code: code });
      if (mongoRes)
        return {
          code: 400,
          payload:
            "The product's code you are trying to add is already created",
        };

      try {
        if (isPremiumUser(user)) product.owner = user.email;
        mongoRes = await productModel.create(product);
        return { payload: mongoRes };
      } catch (error) {
        return { code: 500, payload: error };
      }
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  updateProduct = async (pid, obj, user) => {
    try {
      if (isPremiumUser(user)) {
        return premiumUpdate(pid, obj, user);
      } else {
        const mongoRes = await productModel.findByIdAndUpdate(pid, obj);
        return { payload: mongoRes };
      }
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  deleteProduct = async (pid, user) => {
    try {
      if (isPremiumUser(user)) {
        return premiumDelete(pid, user);
      } else {
        const mongoRes = await productModel.findByIdAndRemove(pid);
        return { payload: mongoRes };
      }
    } catch (error) {
      return { code: 500, payload: error };
    }
  };
}

export default Product;

const premiumDelete = async (pid, user) => {
  const product = await productModel.findById(pid);
  if (product.owner === user.email) {
    const mongoRes = await productModel.findOneAndDelete(pid);
    return { payload: mongoRes };
  }
  return {
    code: 401,
    payload: "Can not delete product. You are not the owner",
  };
};

const premiumUpdate = async (pid, obj, user) => {
  const product = await productModel.findById(pid);
  if (product.owner === user.email) {
    const mongoRes = await productModel.findByIdAndUpdate(pid, obj);
    return { payload: mongoRes };
  }
  return {
    code: 401,
    payload: "Can not update product. You are not the owner",
  };
};
