import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import session from "express-session";
import loginRouter from "./routes/login.routes.js";
import signupRouter from "./routes/signup.routes.js";
import privateRouter from "./routes/private.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
const MONGO_PSW = process.env.MONGO_PSW;
const MONGO_DATABASE = "class_19";
const URI = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

mongoose.connect(URI, (error) => {
  error
    ? console.log({
        status: 500,
        message: "Cannot connect to database: " + error,
      })
    : console.log({ status: 200, message: "Connected to database" });
});

app.engine("handlebars", handlebars.engine());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("mello"));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "SECRET KEY",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: URI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 30,
    }),
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/private", privateRouter);
