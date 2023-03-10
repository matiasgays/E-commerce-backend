import express from "express";
import userModel from "../models/userModel.js";
import { createHash } from "../utils.js";

const forgotRouter = express.Router();

forgotRouter.get("/", (req, res) => {
  res.render("forgot", { style: "forgot.css" });
});

forgotRouter.post("/", async (req, res) => {
  const { uname, psw } = req.body;
  try {
    const updateUser = await userModel.findOneAndUpdate(
      { email: uname },
      { password: createHash(psw) }
    );
    if (updateUser) {
      return res.status(200).json({ message: "User successfully updated" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {}
  res.status(500).json({ message: error });
  return;
});

export default forgotRouter;
