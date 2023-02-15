import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
const MONGO_PSW = process.env.MONGO_PSW;
const MONGO_DATABASE = "class_17";
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
app.use(
  session({
    secret: "coder",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("form", { style: "index.css" });
});

app.post("/setCookie", (req, res) => {
  const { uname, psw } = req.body;
  res.cookie("uname", uname, { maxAge: 30000, signed: true });
  res.cookie("psw", psw, { maxAge: 30000, signed: true });
  res.send({ status: 200, message: "Cookie setted" });
});

app.get("/getCookie", (req, res) => {
  res.send(req.signedCookies);
});

app.get("/delCookie", (req, res) => {
  res.clearCookie("CoderCookie").send("Cookie removed");
});

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`You visited the site ${req.session.counter} times`);
  } else {
    req.session.counter = 1;
    res.send(`Welcome!`);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    err ? res.json({ status: 404, payload: err }) : res.json({ status: 200 });
  });
});

app.get("/login", (req, res) => {
  const { uname, psw } = req.query;
  if (uname !== "mello" && psw !== "mello")
    return res.json({ status: 404, message: "Login Failed" });
  req.session.user = uname;
  req.session.admin = true;
  res.send({ status: 200, message: "Login success" });
});

app.get("/private", auth, (req, res) => {
  res.json({ status: 200, message: "Login Success" });
});

function auth(req, res, next) {
  if (req.session?.user === "mello") return next();
  return res.json({ status: 401, message: "Authentication failed" });
}

app.get("/root", (req, res) => {
  const name = req.query.name;
  if (req.session.counter) {
    req.session.counter++;
    res.send(`${name} visited the site ${req.session.counter} times`);
  } else {
    req.session.counter = 1;
    res.send(`Welcome ${name}!`);
  }
});
