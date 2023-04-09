import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use("/api/users", userRouter);
