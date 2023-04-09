import Router from "router";
import { generateUser } from "../utils.js";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  let users = [];
  for (let i = 0; i < 100; i++) {
    users.push(generateUser());
  }
  res.send({ status: 200, payload: users });
});

export default userRouter;
