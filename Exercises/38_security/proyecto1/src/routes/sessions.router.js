import { Router } from "express";

const router = Router();

const users = [];

router.post("/register", (req, res) => {
  const user = req.body;
  // missing req.body validation -> injection
  //   misssing password encryption ->  Identification and authentication failures
  console.log(user);
  //   wrong console log -> Logging and monitoring failures
  if (users.length === 0) user.id = 1;
  else user.id = users[users.length - 1].id + 1;
  users.push(user);
  res.send({ status: "success", payload: user });
  //   sending credential -> Security Misconfiguration
});

export default router;
