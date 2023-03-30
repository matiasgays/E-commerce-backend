import toysModel from "./models/toysModel.js";

export default class ToysDaoMongo {
  async getToys() {
    const toys = await toysModel.find();
    console.log("get all toys from Mongo");
    return toys;
  }

  async saveToy(toy) {
    await toysModel.create(toy);
    console.log("new toy addedd succesfully into Mongo");
    return;
  }
}
