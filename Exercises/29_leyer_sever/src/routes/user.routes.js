import { Router } from "express";
import * as User from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", User.getUsers);
userRouter.get("/:uid", User.getUserById);
userRouter.post("/", User.saveUser);

export default userRouter;
