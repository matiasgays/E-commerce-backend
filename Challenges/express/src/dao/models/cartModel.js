const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
      },
    ],
    default: [],
    required: true,
  },
});

const cartModel = mongoose.model("cart", cartSchema);
module.exports = {
  cartModel,
};
