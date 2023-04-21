import { productService } from "../dao/repository/index.js";
import { mockingProduct, handleRes } from "../utils/utils.js";

export const getProducts = async (req, res, next) => {
  try {
    return await getProductsAsync(req, res);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { code, payload } = await productService.getProductById(
      req.params.pid
    );
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
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
    const { code, payload } = await productService.addProduct(req.body);
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { code, payload } = await productService.updateProduct(
      req.params.pid,
      req.body
    );
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { code, payload } = await productService.deleteProduct(
      req.params.pid
    );
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

const getProductsAsync = async (req, res) => {
  const { sort, query } = req.query;
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  try {
    const { code, payload } = await productService.getProducts(
      limit,
      page,
      sort,
      query
    );
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};
