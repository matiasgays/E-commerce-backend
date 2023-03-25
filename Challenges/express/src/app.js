import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewRouter from "./routes/view.routes.js";
import messagesRouter from "./routes/messages.routes.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import messagesModel from "./dao/mongoDB/models/messages.model.js";
import __dirname from "./utils.js";
import loginRouter from "./routes/login.routes.js";
import signupRouter from "./routes/signup.routes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import SessionRouter from "./routes/session.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
const MONGO_PSW = process.env.MONGO_PSW;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const URI = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
const sessionsRouter = new SessionRouter();

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

connectDatabase();
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(cookieParser("mello"));
app.use(
  session({
    secret: "SECRET KEY",
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewRouter);
app.use("/messages", messagesRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/sessions", sessionsRouter.getRouter());

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
});

function connectDatabase() {
  const uri = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
  mongoose.connect(uri, (error) => {
    error
      ? console.log({
          status: 500,
          message: "Cannot connect to database: " + error,
        })
      : console.log({ status: 200, message: "Connected to database" });
  });
}
