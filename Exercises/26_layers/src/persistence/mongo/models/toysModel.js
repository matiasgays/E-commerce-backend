import mongoose from "mongoose";

const toySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const toysModel = mongoose.model("toys", toySchema);

export default toysModel;
