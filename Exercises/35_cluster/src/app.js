import cluster from "cluster";
import { cpus } from "os";
import express from "express";
import dotenv from "dotenv";

const processNumber = cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < processNumber; i++) {
    cluster.fork();
  }
  console.log(process.pid);
  cluster.on("message", (worker, msg) => {
    console.log(`Message received from worker pid ${worker.process.pid}`);
    console.log(msg);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  dotenv.config();

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    // console.log(`Server listening on port ${PORT}`);
  });

  app.get("/", (req, res) => {
    res.send({
      status: "success",
      payload: `I am processing...`,
      process: process.pid,
    });
  });

  app.get("/docker", (req, res) => {
    res.send("Hello Docker");
  });

  app.get("/simple", (req, res, next) => {
    let sum;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    res.send({ payload: sum });
  });

  app.get("/complex", (req, res) => {
    let sum;
    for (let i = 0; i < 5e8; i++) {
      sum += i;
    }
    res.send({ payload: sum });
  });

  process.send({ msg: "I am worker process" });
}
