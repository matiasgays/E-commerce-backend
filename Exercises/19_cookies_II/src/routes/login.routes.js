import express from "express";
import userModel from "../models/userModel.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render("login", { style: "login.css" });
});

loginRouter.post("/", async (req, res) => {
  const { uname, psw } = req.body;

  try {
    const mongoRes = await userModel.findOne({
      $and: [{ email: uname, password: psw }],
    });
    mongoRes ? res.status(200).send() : res.status(404).send();
  } catch (error) {
    res.send({ status: 500, message: error });
  }
});

export default loginRouter;
