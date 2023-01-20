const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    res.render('index', { style: 'index.css'});
})

module.exports = {
    indexRouter
}