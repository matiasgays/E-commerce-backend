import { cartService } from "../dao/repository/index.js";
import { handleRes } from "../utils/utils.js";

export const getCart = async (req, res, next) => {
  try {
    const { code, payload } = await cartService.getCart();
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    let { code, payload } = await cartService.getCartById(req.params.cid);
    payload = { ...payload[0]._doc, user: req.user };
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const addProductInCart = async (req, res, next) => {
  try {
    const { code, payload } = await cartService.addProductInCart(
      req.body,
      req.user
    );
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const addProductInCartById = async (req, res, next) => {
  try {
    const { code, payload } = await cartService.addProductInCartById(
      req.params.cid,
      req.params.pid,
      req.user
    );
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const updateCartById = async (req, res, next) => {
  try {
    const { code, payload } = await cartService.updateCartById(
      req.params.cid,
      req.body
    );
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const updateProductInCartById = async (req, res, next) => {
  try {
    const { code, payload } = await cartService.updateProductInCartById(
      req.params.cid,
      req.params.pid,
      req.body.quantity
    );
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const deleteCartById = async (req, res, next) => {
  try {
    const { code, payload } = await cartService.deleteCartById(req.params.cid);
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const deleteProductInCartById = async (req, res, next) => {
  try {
    const { code, payload } = await cartService.deleteProductInCartById(
      req.params.cid,
      req.params.pid
    );
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};
