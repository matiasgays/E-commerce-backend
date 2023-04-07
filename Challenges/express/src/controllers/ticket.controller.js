import {
  ticketService,
  cartService,
  productService,
} from "../dao/repository/index.js";
import crypto from "crypto";

export const getTicket = async (req, res, next) => {
  try {
    const { code } = req.body;
    const { payload } = await ticketService.getTicketByCode(code);
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};

export const createTicket = async (req, res) => {
  try {
    const validProducts = [];
    const outOfStock = [];
    let total = 0;

    const cart = req.body;
    const { _id: cid } = cart[0];
    for (const { product, quantity } of cart[0].products) {
      if (product.stock >= quantity) {
        let { _id: pid } = product;
        validProducts.push({ product, quantity });
        product.stock -= quantity;
        total += product.price * quantity;
        await productService.updateProduct(pid, product);
        await cartService.deleteProductInCartById(cid, pid);
      } else {
        outOfStock.push({ product, quantity });
      }
    }
    const { email } = cart;
    const { payload } = await ticketService.createTicket({
      code: crypto.randomBytes(16).toString("hex").substring(0, 8),
      purchase_datetime: new Date(),
      amount: total,
      purchaser: email,
    });
    res.sendSuccess(payload);
  } catch (error) {
    res.sendError(error);
  }
};
