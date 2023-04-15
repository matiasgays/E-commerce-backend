import express from "express";
import dotenv from "dotenv";
import compressionRouter from "./routes/compression.routes.js";
import compression from "express-compression";
import userRouter from "./routes/user.routes.js";
import errorHandler from "./middlewares/errors/index.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compression());
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
app.use("/gzip", compressionRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);
