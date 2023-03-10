import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  age: String,
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
