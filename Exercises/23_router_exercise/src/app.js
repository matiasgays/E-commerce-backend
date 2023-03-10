import express from "express";
import petsRouter from "./routes/pets.routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/user.routes.js";
import SessionRouter from "./routes/session.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
const MONGO_PSW = process.env.MONGO_PSW;
const MONGO_DATABASE = "class_23";
const URI = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
const userRouter = new UserRouter();
const sessionsRouter = new SessionRouter();
console.log(userRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/pets", petsRouter);
app.use("/users", userRouter.getRouter());
app.use("/sessions", sessionsRouter.getRouter());

async function connectDatabase() {
  const uri = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    return console.log("connected to database");
  } catch (error) {
    console.log({
      status: 500,
      message: "Cannot connect to database: " + error,
    });
  }
}
