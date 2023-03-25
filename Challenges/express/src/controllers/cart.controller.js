import Cart from "../dao/mongoDB/Cart.service.js";

const cart = new Cart();

export const getCart = async (req, res, next) => {
  try {
    const serverRes = await cart.getCart();
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
    const serverRes = await cart.getCartById(req.params.cid);
    res.send({
      status: 200,
      message: serverRes.message,
      payload: serverRes.payload,
    });
  } catch (error) {
    res.send({ status: 500, message: "Cannot get cart: " + error });
  }
};

export const addProductInCart = async (req, res, next) => {
  try {
    const serverRes = await cart.addProductInCart(req.body);
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
    const serverRes = await cart.addProductInCartById(
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
    const serverRes = await cart.updateCartById(req.params.cid, req.body);
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
    const serverRes = await cart.updateProductInCartById(
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
    const serverRes = await cart.deleteCartById(req.params.cid);
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
    const serverRes = await cart.deleteProductInCartById(
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
