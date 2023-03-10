import mongoose from "mongoose";

const petsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specie: {
    type: String,
    required: true,
  },
  adopted: {
    type: Boolean,
    default: false,
  },
});

const petsModel = mongoose.model("pets", petsSchema);

export default petsModel;
