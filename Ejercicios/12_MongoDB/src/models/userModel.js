const mongoose = require('mongoose');

const userCollection = "users";

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    }
})

const userModel = mongoose.model(userCollection,userSchema);
module.exports = {
    userModel
}