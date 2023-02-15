const express = require("express");
const cartRouter = express.Router();
const { Cart } = require("../dao/Cart.js");

const cart = new Cart();

cartRouter.get("/", (req, res, next) => {
  getCartAsync(req, res);
  // res.render("cartId", { style: "cart.css" });
});

cartRouter.get("/:cid", (req, res) => {
  getCartByIdAsync(req, res);
});

cartRouter.post("/", (req, res) => {
  addProductInCartAsync(req, res);
});

cartRouter.post("/:cid/product/:pid", (req, res) => {
  addProductInCartByIdAsync(req, res);
});

cartRouter.put("/:cid", (req, res) => {
  updateCartByIdAsync(req, res);
});

cartRouter.put("/:cid/product/:pid", (req, res) => {
  updateProductInCartByIdAsync(req, res);
});

cartRouter.delete("/:cid", (req, res) => {
  deleteCartByIdAsync(req, res);
});

cartRouter.delete("/:cid/product/:pid", (req, res) => {
  deleteProductInCartByIdAsync(req, res);
});

module.exports = {
  cartRouter,
};

const getCartAsync = async (req, res) => {
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

const getCartByIdAsync = async (req, res) => {
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

const updateCartByIdAsync = async (req, res) => {
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

const addProductInCartAsync = async (req, res) => {
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

const addProductInCartByIdAsync = async (req, res) => {
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

const updateProductInCartByIdAsync = async (req, res) => {
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

const deleteProductInCartByIdAsync = async (req, res) => {
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

const deleteCartByIdAsync = async (req, res) => {
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
