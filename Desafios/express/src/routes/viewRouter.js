const express = require('express');
const viewRouter = express.Router();
const { Product } = require('../dao/fileSystem/Product');
const path =  './src/dao/fileSystem/products.json';
const fs = require('fs');

viewRouter.get('/', (req, res) => {
    const products = fs.readFileSync('./src/dao/fileSystem/products.json', "utf8");
    const productsJSON = JSON.parse(products);
    res.render('home', {products: productsJSON, style: 'index.css'} );
})

viewRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {style: 'index.css'} );
})

module.exports = {
    viewRouter
}