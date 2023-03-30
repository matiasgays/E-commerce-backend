import mongoose from "mongoose";

const contactsSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const contactsModel = mongoose.model("contacts", contactsSchema);

export default contactsModel;
