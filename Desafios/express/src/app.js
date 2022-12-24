const express = require('express');
const { ProductManager } = require('./productManager');
const path =  './src/products.json';

const app = express();
app.use(express.urlencoded({extended : true}));

app.get('/products',(req, res) => {
    getProductsAsync(req, res);
});

app.get('/products/:pid',(req, res) => {
    getProductByIdAsync(req, res);
});

app.listen(8080, console.log('Server listening in port :8080'));

const getProductsAsync = async (req, res) => {
    const newProductManager = new ProductManager(path);
    let limit = req.query.limit;
    try {
        const data = await newProductManager.getProducts();
        if (!limit) res.send(data)
        else {
            const dataLimited = data.filter((element,index) => index < limit );
            res.send(dataLimited);
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getProductByIdAsync = async (req, res) => {
    const newProductManager = new ProductManager(path);
    try {
        res.send(await newProductManager.getproductById(Number(req.params.pid)));
    } catch (error) {
        throw new Error(error);
    }
}