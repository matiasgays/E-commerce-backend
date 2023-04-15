import {
  ticketService,
  cartService,
  productService,
} from "../dao/repository/index.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { handleRes } from "../utils.js";

export const getTicket = async (req, res, next) => {
  try {
    const { codeNumber } = req.body;
    const { code, payload } = await ticketService.getTicketByCode(codeNumber);
    handleRes(res, code, payload);
  } catch (error) {
    res.sendError(500, error);
  }
};

export const createTicket = async (req, res) => {
  try {
    const validProducts = [];
    const outOfStock = [];
    let total = 0;

    const { _id: cid, products, user } = req.body;
    for (const { product, quantity } of products) {
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
    const { email } = user;
    const { payload } = await ticketService.createTicket({
      code: crypto.randomBytes(16).toString("hex").substring(0, 8),
      purchase_datetime: new Date(),
      amount: total,
      purchaser: email,
    });
    const { code } = sendEmail(payload);
    handleRes(res, code, payload);
  } catch (error) {
    res.sendError(500, error);
  }
};

const sendEmail = async (ticket) => {
  try {
    const { code, purchase_datetime, amount, purchaser } = ticket;
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "ing.matiasgays@gmail.com",
        pass: "pwkmijenegtzmzrx",
      },
    });

    await transport.sendMail({
      from: "ing.matiasgays@gmail.com",
      to: purchaser,
      subject: "New Ticket",
      html: `
    <div>
        <h3>Thank you ${purchaser}</h3>
        <h3>Code: ${code}</h1>
        <h3>Purchase DateTime: ${purchase_datetime}</h2>
        <h3>Amount: ${amount}</h3>
    </div>`,
      attachments: [],
    });
  } catch (error) {
    return { code: 500, msg: error };
  }
  return;
};
