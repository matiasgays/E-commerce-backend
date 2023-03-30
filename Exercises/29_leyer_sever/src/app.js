import express from "express";
import userRouter from "./routes/user.routes.js";
import orderRouter from "./routes/order.routes.js";
import businessRouter from "./routes/business.routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
const MONGO_PSW = process.env.MONGO_PSW;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const URI = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/business", businessRouter);

connectDatabase();

async function connectDatabase() {
  try {
    await mongoose.connect(URI);
    return console.log("connected to database");
  } catch (error) {
    console.log({
      status: 500,
      message: "Cannot connect to database: " + error,
    });
  }
}
