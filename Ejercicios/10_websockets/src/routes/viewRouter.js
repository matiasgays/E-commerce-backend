const express = require('express');
const viewRouter = express.Router();

viewRouter.get('/', (req, res) => {
    res.render('index',{status:200, style: 'index.css'} );
})

module.exports = {
    viewRouter
}