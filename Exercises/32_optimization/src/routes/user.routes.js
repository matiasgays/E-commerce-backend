import { Router } from "express";
import CustomError from "../services/errors/CustomError.js";
import EEnum from "../services/errors/EEnum.js";
import {
  generateUserErrorInfo,
  generateParamErrorInfo,
} from "../services/errors/info.js";

const users = [];

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ status: 200, payload: users });
});

userRouter.get("/:uid", (req, res) => {
  const { uid } = req.params;
  if (uid.match(/\D/) || !uid) {
    return CustomError.createError({
      name: "User ID invalid",
      cause: generateParamErrorInfo(uid),
      message: "Error trying to find user",
      code: EEnum.INVALID_PARAM_ERROR,
    });
  }
  res.send({ status: 200, payload: users[parseInt(uid - 1)] });
});

userRouter.post("/", (req, res) => {
  const { firstName, lastName, age, email } = req.body;
  if (!firstName || !lastName || !email) {
    return CustomError.createError({
      name: "User creation error",
      cause: generateUserErrorInfo({ firstName, lastName, email }),
      message: "Error trying to create user",
      code: EEnum.INVALID_TYPE_ERROR,
    });
  }

  const user = {
    firstName,
    lastName,
    age,
    email,
  };

  if (users.length === 0) user.id = 1;
  else user.id = users[users.length - 1].id + 1;

  users.push(user);
  res.send({ status: 200, payload: user });
});

export default userRouter;
