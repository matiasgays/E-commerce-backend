import express from "express";
import userModel from "../models/userModel.js";
import { isValidPassword } from "../utils.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.render("login", { style: "login.css" });
  });
});

loginRouter.post("/", async (req, res) => {
  const { uname, psw } = req.body;

  try {
    const user = await userModel.findOne({ email: uname });
    if (user) {
      if (!isValidPassword(user, psw))
        return res.status(401).json({ message: "Authentication failed" });
      delete user.password;
      req.session.user = user;
      return res.status(200).json({ message: "Authentication succed" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.send({ status: 500, message: error });
  }
});

export default loginRouter;
