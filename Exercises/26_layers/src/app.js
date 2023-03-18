import express from "express";
import userRouter from "./routes/user.routes.js";
import toysRouter from "./routes/toys.routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
const MONGO_PSW = process.env.MONGO_PSW;
const MONGO_DATABASE = "class_26";

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/toys", toysRouter);

connectDatabase();

async function connectDatabase() {
  const uri = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri);
    return console.log("connected to database");
  } catch (error) {
    console.log({
      status: 500,
      message: "Cannot connect to database: " + error,
    });
  }
}
