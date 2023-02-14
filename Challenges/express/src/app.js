const express = require("express");
const app = express();
const { productsRouter } = require("./routes/productsRouter");
const { cartRouter } = require("./routes/cartRouter");
const { viewRouter } = require("./routes/viewRouter");
const { messagesRouter } = require("./routes/messagesRouter");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { messagesModel } = require("./dao/models/messagesModel.js");
const { productModel } = require("./dao/models/productModel.js");
const { Product } = require("./dao/Product.js");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

dotenv.config();
const PORT = process.env.PORT;
const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
const MONGO_PSW = process.env.MONGO_PSW;
const MONGO_DATABASE = "ecommerce";
let products;
const newProduct = new Product();

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const connectDatabase = () => {
  const uri = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
  mongoose.connect(uri, (error) => {
    error
      ? console.log({
          status: 500,
          message: "Cannot connect to database: " + error,
        })
      : console.log({ status: 200, message: "Connected to database" });
  });
};

connectDatabase();
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/", viewRouter);
app.use("/messages", messagesRouter);

io.on("connection", (socket) => {
  socket.on("log in", (usr) => {
    socket.broadcast.emit("new user", usr);
    const getMessages = async () => {
      try {
        const mongoRes = await messagesModel.find();
        socket.emit("chat logs", mongoRes);
      } catch (error) {
        throw new Error("Server failed to get messages");
      }
    };
    getMessages();
  });

  socket.on("send message", (msg) => {
    const postMessage = async () => {
      try {
        const mongoRes = await messagesModel.create(msg);
        io.emit("messages", mongoRes);
      } catch (error) {
        throw new Error("Server failed to post messages");
      }
    };
    postMessage();
  });

  let _page = 1;

  const getProducts = async () => {
    try {
      products = await productModel.paginate({}, { limit: 10, page: 1 });
    } catch (error) {
      throw new Error("cannot get products");
    }
  };

  getProducts().then(() => {
    socket.emit("products", products.payload);
  });

  socket.on("nextPage", async () => {
    try {
      products = await productModel.paginate(
        {},
        { limit: 1, page: `${++_page}` }
      );
      socket.emit("products", products);
    } catch (error) {
      throw new Error("cannot get products");
    }
  });

  socket.on("prevPage", async () => {
    try {
      products = await productModel.paginate(
        { gender: "F" },
        { limit: 1, page: `${--_page}` }
      );
      socket.emit("products", products);
    } catch (error) {
      throw new Error("cannot get products");
    }
  });
});
