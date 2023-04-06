import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_datetime: Date,
  amount: Number,
  purchaser: String,
});

const ticketModel = mongoose.model("ticket", ticketSchema);

export default ticketModel;
