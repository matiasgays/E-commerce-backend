import { Router } from "express";

const operationRouter = Router();

operationRouter.get("/simple", (req, res, next) => {
  let sum;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  res.send({ payload: "sum" });
});

operationRouter.get("/complex", (req, res) => {
  let sum;
  for (let i = 0; i < 5e8; i++) {
    sum += i;
  }
  res.send({ payload: sum });
});

export default operationRouter;
