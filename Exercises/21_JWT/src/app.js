import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import session from "express-session";
import loginRouter from "./routes/login.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
const MONGO_PSW = process.env.MONGO_PSW;
const MONGO_DATABASE = "class_21";
const URI = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

connectMongoose();

app.engine("handlebars", handlebars.engine());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

initializePassport();
app.use(passport.initialize());
app.use(
  session({
    secret: "mello",
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/login", loginRouter);
app.use("/api/sessions", sessionsRouter);

async function connectMongoose() {
  try {
    await mongoose.connect(URI);
    return console.log({ status: 200, message: "Connected to database" });
  } catch (error) {
    console.log({
      status: 500,
      message: "Cannot connect to database: " + error,
    });
  }
}
