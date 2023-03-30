import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: String,
  products: [],
});

const orderModel = mongoose.model("Business", businessSchema);
export default orderModel;
