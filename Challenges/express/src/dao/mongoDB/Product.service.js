import productModel from "./models/product.model.js";

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
      return { error };
    }
  };

  getProductById = async (pid) => {
    try {
      const mongoRes = await productModel.findById(pid);
      return { payload: mongoRes };
    } catch (error) {
      return { error };
    }
  };

  addProduct = async (product) => {
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
      return { payload: "arguments can't be falsy" };

    try {
      let mongoRes = await productModel.findOne({ code: code });
      if (mongoRes)
        return {
          payload:
            "The product's code you are trying to add is already created",
        };

      try {
        mongoRes = await productModel.create(product);
        return { paylaod: mongoRes };
      } catch (error) {
        return { error };
      }
    } catch (error) {
      return { error };
    }
  };

  updateProduct = async (pid, obj) => {
    try {
      const mongoRes = await productModel.findByIdAndUpdate(pid, obj);
      return { paylaod: mongoRes };
    } catch (error) {
      return { error };
    }
  };

  deleteProduct = async (pid) => {
    try {
      const mongoRes = await productModel.findByIdAndRemove(pid);
      return { paylaod: mongoRes };
    } catch (error) {
      return { error };
    }
  };
}

export default Product;
