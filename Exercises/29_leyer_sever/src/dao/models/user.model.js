import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  orders: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Orders",
    },
  ],
});

const userModel = mongoose.model("Users", userSchema);
export default userModel;
