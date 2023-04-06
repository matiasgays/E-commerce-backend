import express from "express";
import ProductsRouter from "./routes/products.routes.js";
import CartRouter from "./routes/cart.routes.js";
import viewRouter from "./routes/view.routes.js";
import MessagesRouter from "./routes/messages.routes.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import dotenv from "dotenv";
import messagesModel from "./dao/mongoDB/models/messages.model.js";
import __dirname from "./utils.js";
import LoginRouter from "./routes/login.routes.js";
import SignupRouter from "./routes/signup.routes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import SessionRouter from "./routes/session.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const sessionsRouter = new SessionRouter();
const productsRouter = new ProductsRouter();
const signupRouter = new SignupRouter();
const cartRouter = new CartRouter();
const messagesRouter = new MessagesRouter();
const loginRouter = new LoginRouter();

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

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

app.use("/api/products", productsRouter.getRouter());
app.use("/api/cart", cartRouter.getRouter());
app.use("/", viewRouter);
app.use("/messages", messagesRouter.getRouter());
app.use("/login", loginRouter.getRouter());
app.use("/signup", signupRouter.getRouter());
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
