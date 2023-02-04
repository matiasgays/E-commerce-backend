const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    products: {
        type: Array,
        default: []
    }
})

const cartModel = mongoose.model('cart', cartSchema);
module.exports = {
    cartModel
}