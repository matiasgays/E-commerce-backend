import { users } from "../persistence/dao.js";

export const getUsers = async (req, res) => {
  res.send(await users.getUsers());
};

export const saveUser = async (req, res) => {
  const newUser = req.body;
  users.saveUser(newUser);
  res.status(200).json({ msg: "user added successfully" });
};
