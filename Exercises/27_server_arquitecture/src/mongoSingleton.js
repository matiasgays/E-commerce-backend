import mongoose from "mongoose";

export default class MongoSingleton {
  static #instance;

  constructor() {
    mongoose.connect("uri");
  }

  static getInstance() {
    if (this.#instance) console.log("Mongo already connected");
    else {
      this.#instance = new MongoSingleton();
      console.log("Mongo connected");
    }
    return this.#instance;
  }
}
