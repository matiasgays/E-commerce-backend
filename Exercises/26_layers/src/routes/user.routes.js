import express from "express";
import { getUsers, saveUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", saveUser);

export default userRouter;
