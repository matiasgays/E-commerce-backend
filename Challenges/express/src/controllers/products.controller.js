import Product from "../dao/mongoDB/Product.service.js";

const newProduct = new Product();

export const getProducts = async (req, res, next) => {
  try {
    const { status, payload } = await getProductsAsync(req, res);
    res.status(status).send({ payload });
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const serverRes = await newProduct.getProductById(req.params.pid);
    res.send({
      status: 200,
      message: serverRes.message,
      payload: serverRes.payload,
    });
  } catch (error) {
    res.send({ status: 500, message: "Could not get products: " + error });
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const serverRes = await newProduct.addProduct(req.body);
    !serverRes.error
      ? res.send({ status: 200, message: serverRes.message })
      : res.send({ status: 400, message: serverRes.message });
  } catch (error) {
    res.send({ status: 500, message: "Could not add product: " + error });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const serverRes = await newProduct.updateProduct(req.params.pid, req.body);
    !serverRes.error
      ? res.send({ status: 200, message: serverRes.message })
      : res.send({ status: 400, message: serverRes.message });
  } catch (error) {
    res.send({ status: 500, message: "Could not update product: " + error });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const serverRes = await newProduct.deleteProduct(req.params.pid);
    !serverRes.error
      ? res.send({ status: 200, message: serverRes.message })
      : res.send({ status: 400, message: serverRes.message });
  } catch (error) {
    res.send({ status: 500, message: "Could not delete product: " + error });
  }
};

const getProductsAsync = async (req, res) => {
  const { sort, query } = req.query;
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  try {
    const serverRes = await newProduct.getProducts(limit, page, sort, query);
    return {
      status: 200,
      message: serverRes.message,
      payload: serverRes.payload,
    };
  } catch (error) {
    res.send({ status: 500, message: "Could not get products: " + error });
  }
};
