import userModel from "../models/user.model.js";

export default class User {
  constructor() {}

  getUsers = async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (id) => {
    try {
      const user = await userModel.findById({ _id: id });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  saveUser = async (user) => {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateUser = async (id, user) => {
    try {
      const newUser = await userModel.findByIdAndUpdate(
        { _id: id },
        { $set: user }
      );
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  };
}
