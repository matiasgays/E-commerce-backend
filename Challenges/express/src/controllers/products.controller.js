import { productService } from "../dao/repository/index.js";
import { mockingProduct } from "../utils.js";

export const getProducts = async (req, res, next) => {
  try {
    const { payload } = await getProductsAsync(req, res);
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { payload } = await productService.getProductById(req.params.pid);
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const mockingProducts = (req, res) => {
  const products = [];
  const numOfProducts = 100;
  for (let i = 0; i < numOfProducts; i++) {
    products.push(mockingProduct());
  }
  res.sendSuccess(products);
};

export const addProduct = async (req, res, next) => {
  try {
    const { payload } = await productService.addProduct(req.body);
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { payload } = await productService.updateProduct(
      req.params.pid,
      req.body
    );
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { payload } = await productService.deleteProduct(req.params.pid);
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

const getProductsAsync = async (req, res) => {
  const { sort, query } = req.query;
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  try {
    const { payload } = await productService.getProducts(
      limit,
      page,
      sort,
      query
    );
    return { payload };
  } catch (error) {
    return { error };
  }
};
