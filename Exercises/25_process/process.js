import express from "express";
import config from "./src/config/config.js";
import fork from "child_process";

const app = express();

app.get("/add", (req, res) => {
  const child = fork.fork("./src/config/complexOperation.js");
  child.send("Start the complex operation");
  child.on("message", (result) => {
    res.send({ result });
  });
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

console.log(config);

process.on("message", () => {});
