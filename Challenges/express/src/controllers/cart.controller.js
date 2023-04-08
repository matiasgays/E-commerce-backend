import { cartService } from "../dao/repository/index.js";

export const getCart = async (req, res, next) => {
  try {
    const { payload } = await cartService.getCart();
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    let { payload } = await cartService.getCartById(req.params.cid);
    payload = { ...payload[0]._doc, user: req.user };
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const addProductInCart = async (req, res, next) => {
  try {
    const { payload } = await cartService.addProductInCart(req.body);
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const addProductInCartById = async (req, res, next) => {
  try {
    const { payload } = await cartService.addProductInCartById(
      req.params.cid,
      req.params.pid
    );
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const updateCartById = async (req, res, next) => {
  try {
    const { payload } = await cartService.updateCartById(
      req.params.cid,
      req.body
    );
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const updateProductInCartById = async (req, res, next) => {
  try {
    const { payload } = await cartService.updateProductInCartById(
      req.params.cid,
      req.params.pid,
      req.body.quantity
    );
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const deleteCartById = async (req, res, next) => {
  try {
    const { payload } = await cartService.deleteCartById(req.params.cid);
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const deleteProductInCartById = async (req, res, next) => {
  try {
    const { payload } = await cartService.deleteProductInCartById(
      req.params.cid,
      req.params.pid
    );
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};
