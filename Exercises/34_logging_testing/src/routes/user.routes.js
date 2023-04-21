import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { faker } from "@faker-js/faker";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", registerUser);
userRouter.get("/faker", (req, res) => {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  res.send({ firstname, lastname, email, password });
});

export default userRouter;
