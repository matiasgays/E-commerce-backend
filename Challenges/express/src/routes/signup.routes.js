import express from "express";
import userModel from "../dao/models/userModel.js";

const signupRouter = express.Router();

signupRouter.get("/", (req, res) => {
  res.render("signup", { style: "signup.css" });
});

signupRouter.post("/", async (req, res) => {
  try {
    await userModel.create(req.body);
    res.status(201).send();
  } catch (error) {
    res.send({ status: 500, message: error });
  }
});

export default signupRouter;
