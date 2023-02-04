const express = require("express");
const messagesRouter = express.Router();

messagesRouter.get('/', (req, res) => {
    res.render('chat', { style: 'chat.css' });
})

module.exports = {
    messagesRouter
}