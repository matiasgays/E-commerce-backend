import orderModel from "../models/order.model.js";

export default class Order {
  constructor() {}

  getOrders = async () => {
    try {
      const orders = await orderModel.find();
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  };

  getOrderById = async (id) => {
    try {
      const order = await orderModel.findById({ _id: id });
      return order;
    } catch (error) {
      throw new Error(error);
    }
  };

  createOrder = async (order) => {
    try {
      const newOrder = await orderModel.create(order);
      return newOrder;
    } catch (error) {
      throw new Error(error);
    }
  };

  resolveOrder = async (id, order) => {
    try {
      const newOrder = await orderModel.findByIdAndUpdate(
        { _id: id },
        { $set: order }
      );
      return newOrder;
    } catch (error) {
      throw new Error(error);
    }
  };
}
