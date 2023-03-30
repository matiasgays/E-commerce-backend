import { Router } from "express";
import * as Order from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.get("/", Order.getOrders);
orderRouter.get("/:oid", Order.getOrderById);
orderRouter.post("/", Order.createOrder);
orderRouter.put("/:oid", Order.resolveOrder);

export default orderRouter;
