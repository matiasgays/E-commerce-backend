import express from "express";
import dotenv from "dotenv";
import operationRouter from "./routes/operation.routes.js";
import userRouter from "./routes/user.routes.js";
import { addLogger } from "./utils/logger.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger);
app.use("/operation", operationRouter);
app.use("/api/user", userRouter);

connectDatabase();

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
