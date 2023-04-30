import mongoose from "mongoose";

const resetPasswordSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiration: {
    type: Date,
    required: true,
    default: new Date(new Date().getTime() + 60 * 60 * 1000),
  },
});

const resetPasswordModel = mongoose.model("resetPassword", resetPasswordSchema);

export default resetPasswordModel;
