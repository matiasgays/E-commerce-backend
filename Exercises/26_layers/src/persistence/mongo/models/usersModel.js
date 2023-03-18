import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const usersModel = mongoose.model("users", userSchema);

export default usersModel;
