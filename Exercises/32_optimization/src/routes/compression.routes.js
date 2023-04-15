import { Router } from "express";

const compressionRouter = Router();

compressionRouter.get("/", (req, res) => {
  let string = "Hello world";
  for (let i = 0; i < 5000000; i++) {
    string += "hello";
  }
  res.send(string);
});

export default compressionRouter;
