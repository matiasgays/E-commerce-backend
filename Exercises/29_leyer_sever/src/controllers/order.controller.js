import Order from "../dao/classes/order.class.js";
import User from "../dao/classes/user.class.js";
import Business from "../dao/classes/business.class.js";

const orderService = new Order();
const userService = new User();
const businessService = new Business();

export const getOrders = async (req, res) => {
  const orders = await orderService.getOrders();
  res.status(200).json({ payload: orders });
};

export const getOrderById = async (req, res) => {
  const order = await orderService.getOrderById(req.params.oid);
  res.status(200).json({ payload: order });
};

export const createOrder = async (req, res) => {
  const { user, business, products } = req.body;
  const resultUser = await userService.getUserById(user);
  const resultBusiness = await businessService.getBusinessById(business);
  let actualOrders = resultBusiness.products.filter((product) =>
    products.includes(product.id)
  );
  let sum = actualOrders.reduce((acc, prev) => {
    acc += prev.price;
    return acc;
  }, 0);
  let orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);
  let order = {
    number: orderNumber,
    business,
    user,
    status: "pending",
    products: actualOrders.map((product) => product.id),
    totalPrice: sum,
  };
  const newOrder = await orderService.createOrder(order);
  resultUser.orders.push(newOrder._id);
  await userService.updateUser(user, resultUser);
  res.status(200).json({ payload: newOrder });
};

export const resolveOrder = async (req, res) => {
  let order = await orderService.getOrderById(req.params.oid);
  order.status = "resolve";
  const newOrder = await orderService.resolveOrder(order._id, order);
  res.status(200).json({ payload: newOrder });
};
