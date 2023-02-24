import mongoose from "mongoose";

const messagesSchema = mongoose.Schema({
  user: String,
  message: String,
});

const messagesModel = mongoose.model("messages", messagesSchema);

export default messagesModel;
