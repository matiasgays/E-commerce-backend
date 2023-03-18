import UsersDaoMongo from "./mongo/users.service.js";
import UsersDaoLocal from "./local/usersDaoLocal.js";
import ToysDaoMongo from "./mongo/toys.service.js";
import ToysDaoLocal from "./local/toysDaoLocal.js";
import { DAO } from "./../config/config.js";

export const toys = DAO === "local" ? new ToysDaoLocal() : new ToysDaoMongo();
export const users =
  DAO === "local" ? new UsersDaoLocal() : new UsersDaoMongo();
