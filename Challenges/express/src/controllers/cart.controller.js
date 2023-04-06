import { cartService } from "../dao/repository/index.js";

export const getCart = async (req, res, next) => {
  try {
    const serverRes = await cartService.getCart();
    res.send({
      status: 200,
      message: serverRes.message,
      payload: serverRes.payload,
    });
  } catch (error) {
    res.send({ status: 500, message: "Cannot get cart: " + error });
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const serverRes = await cartService.getCartById(req.params.cid);
    res.send({
      status: 200,
      message: serverRes.message,
      payload: serverRes.payload,
      user: req.user,
    });
  } catch (error) {
    res.send({ status: 500, message: "Cannot get cart: " + error });
  }
};

export const addProductInCart = async (req, res, next) => {
  try {
    const serverRes = await cartService.addProductInCart(req.body);
    !serverRes.error
      ? res.send({ status: 200, message: serverRes.message })
      : res.send({ status: 400, message: serverRes.message });
  } catch (error) {
    res.send({
      status: 500,
      message: "Could not add product to cart: " + error,
    });
  }
};

export const addProductInCartById = async (req, res, next) => {
  try {
    const serverRes = await cartService.addProductInCartById(
      req.params.cid,
      req.params.pid
    );
    res.send({ status: 200, message: serverRes.message });
  } catch (error) {
    res.send({
      status: 500,
      message: "Could not add product to cart: " + error,
    });
  }
};

export const updateCartById = async (req, res, next) => {
  try {
    const serverRes = await cartService.updateCartById(
      req.params.cid,
      req.body
    );
    res.send({
      status: 200,
      message: serverRes.message,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Could not update products in cart: " + error,
    });
  }
};

export const updateProductInCartById = async (req, res, next) => {
  try {
    const serverRes = await cartService.updateProductInCartById(
      req.params.cid,
      req.params.pid,
      req.body.quantity
    );
    !serverRes.error
      ? res.send({ status: 200, message: serverRes.message })
      : res.send({ status: 400, message: serverRes.message });
  } catch (error) {
    res.send({
      status: 500,
      message: "Could not update product in cart: " + error,
    });
  }
};

export const deleteCartById = async (req, res, next) => {
  try {
    const serverRes = await cartService.deleteCartById(req.params.cid);
    res.send({ status: 200, message: serverRes.message });
  } catch (error) {
    res.send({
      status: 500,
      message: "Could not delete product from cart: " + error,
    });
  }
};

export const deleteProductInCartById = async (req, res, next) => {
  try {
    const serverRes = await cartService.deleteProductInCartById(
      req.params.cid,
      req.params.pid
    );
    !serverRes.error
      ? res.send({ status: 200, message: serverRes.message })
      : res.send({ status: 400, message: serverRes.message });
  } catch (error) {
    res.send({
      status: 500,
      message: "Could not delete product from cart: " + error,
    });
  }
};
