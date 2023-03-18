import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();
const processCodes = {
  0: "process successfully ended",
  1: "process do not successfully ended",
  5: "V8 fatal error",
  9: "Invalid arguments",
};

program.option("--mode <mode>", "work mode", "production");

program.parse();

console.log("Options: ", program.opts());
console.log("Remaining arguments: ", program.args);

dotenv.config({
  path: `./.env.${program.opts().mode}`,
});

// process.on("exit", (code) => {
//   console.log("this code is goint to run before exit the process");
// });

process.on("uncaughtException", (code) => {
  console.log(
    "this code grab all not managed exceptions as call a function that is not declared"
  );
});

// process.on("message", (code) => {
//   console.log(
//     "this code is goint to run when a process want to send a message"
//   );
// });

export default {
  port: process.env.PORT,
  mongoUserName: process.env.MONGO_USER_NAME,
  mongoPsw: process.env.MONGO_PSW,
  githubClienteId: process.env.GITHUB_CLIENT_ID,
  githubClienteSecret: process.env.GITHUB_CLIENT_SECRET,
  githubCallbackUrl: process.env.GITHUB_CALLBACK_URL,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};

function listNumbers(...numbers) {
  const array = numbers.map((num) => typeof num);
  numbers.forEach((num) => {
    typeof num != "number" &&
      process.on("exit", () => {
        return console.log({ dataType: array, error: processCodes[9] });
      });
  });
}

listNumbers(1, "2", 3);
