import User from "../dao/classes/user.class.js";

const userService = new User();

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ payload: users });
};

export const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.uid);
  res.status(200).json({ payload: user });
};

export const saveUser = async (req, res) => {
  const user = await userService.saveUser(req.body);
  res.status(200).json({ payload: user });
};
