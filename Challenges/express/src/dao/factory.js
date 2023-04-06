import mongoose from "mongoose";
import dotenv from "dotenv";

const persistence = process.argv[2];
export let Cart;
export let Product;
export let Ticket;

switch (persistence) {
  case "MONGO":
    connectDatabase();
    const { default: CartMongo } = await import("./mongoDB/Cart.service.js");
    const { default: ProductMongo } = await import(
      "./mongoDB/Product.service.js"
    );
    const { default: TicketMongo } = await import(
      "./mongoDB/Ticket.service.js"
    );
    Cart = CartMongo;
    Product = ProductMongo;
    Ticket = TicketMongo;
    console.log("Connected to MongoDB");
    break;
  case "MEMORY":
    Cart = await import("./fileSystem/Product.js");
    Product = await import("./fileSystem/Cart.js");
    console.log("Connected to Memory");
    break;
}

async function connectDatabase() {
  dotenv.config();

  const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
  const MONGO_PSW = process.env.MONGO_PSW;
  const MONGO_DATABASE = process.env.MONGO_DATABASE;
  const URI = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;

  try {
    return await mongoose.connect(URI);
  } catch (error) {
    console.log({
      status: 500,
      message: "Cannot connect to database: " + error,
    });
  }
}
