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
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  cartId: {
    type: [
      {
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "cartId",
        },
        quantity: Number,
      },
    ],
    default: [],
  },
  role: {
    type: String,
    enum: ["USER", "USER_PREMIUM", "ADMIN"],
    required: true,
  },
  documents: {
    type: [
      {
        name: String,
        reference: String,
      },
    ],
    default: [],
  },
  lastConnection: Date,
  cartId: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
