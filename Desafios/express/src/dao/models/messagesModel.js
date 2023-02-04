const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
    user: String,
    message: String
})

const messagesModel = mongoose.model('messages', messagesSchema);
module.exports = {
    messagesModel
}