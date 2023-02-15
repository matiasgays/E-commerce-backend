import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import courseModel from "./models/courseModel.js";
import studentModel from "./models/studentModel.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { generateStudents } from "./data/data.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
const MONGO_PSW = process.env.MONGO_PSW;
const MONGO_DATABASE = "index";
const URI = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
let students;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const connectDatabase = async () => {
  mongoose.connect(URI, (error) => {
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

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("students");
});

io.on("connection", (socket) => {
  let _page = 1;
  let nextPage;
  let prevPage;

  const getStudents = async () => {
    try {
      students = await studentModel.paginate(
        { gender: "F" },
        { limit: 10, page: `${_page}` }
      );
      nextPage = students.hasNextPage;
      prevPage = students.hasPrevPage;
    } catch (error) {
      throw new Error("cannot get students");
    }
  };
  getStudents();
  socket.emit("students", students);

  socket.on("nextPage", async () => {
    try {
      students = await studentModel.paginate(
        { gender: "F" },
        { limit: 10, page: `${++_page}` }
      );
      socket.emit("students", students);
    } catch (error) {
      throw new Error("cannot get students");
    }
  });

  socket.on("prevPage", async () => {
    try {
      students = await studentModel.paginate(
        { gender: "F" },
        { limit: 10, page: `${--_page}` }
      );
      socket.emit("students", students);
    } catch (error) {
      throw new Error("cannot get students");
    }
  });
});
