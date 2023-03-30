import usersModel from "./models/usersModel.js";

export default class UsersDaoMongo {
  async getUsers() {
    const users = await usersModel.find();
    console.log("get all users from Mongo");
    return users;
  }

  async saveUser(user) {
    const res = await usersModel.create(user);
    console.log("new user addedd succesfully to mongo");
    console.log(res);
    return;
  }
}
