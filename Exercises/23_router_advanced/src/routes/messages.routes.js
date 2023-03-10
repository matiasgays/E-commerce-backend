import express from "express";

const messagesRouter = express.Router();

messagesRouter.get("/", (req, res) => {
  res.render("chat", { style: "chat.css" });
});

export default messagesRouter;
