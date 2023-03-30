import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  number: Number,
  business: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Business",
    },
  ],
  user: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
  ],
  status: {
    type: String,
    default: "",
  },
  products: [],
  totalPrice: Number,
});

const orderModel = mongoose.model("Orders", orderSchema);
export default orderModel;
