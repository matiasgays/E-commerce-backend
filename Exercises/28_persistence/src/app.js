import express from "express";
import contactsRouter from "./routes/contact.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(express.json());
app.use("/api/users", contactsRouter);
