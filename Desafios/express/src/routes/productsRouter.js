const express = require("express");
const productRouter = express.Router();
const { Product } = require('../Product');
const path =  './src/db/products.json';

const newProduct = new Product(path);

productRouter.get('/',(req, res, next) => {
    getProductsAsync(req, res);
});

productRouter.get('/:pid',(req, res) => {
    getProductByIdAsync(req, res);
});

productRouter.post('/', (req,res) => {
    addProductAsync(req,res);
})

productRouter.put('/:pid',(req, res) => {
    updateProductAsync(req, res);
})

productRouter.delete('/:pid',(req, res) => {
    deleteProductAsync(req, res);
})

module.exports = {
    productRouter
}

const getProductsAsync = async (req, res) => {
    let limit = req.query.limit;
    try {
        let serverRes = await newProduct.getProducts();
        if (!serverRes.error) {
            if (!limit) {
                res.send({status: 200, message: serverRes.message, payload: serverRes.payload});
            }
            else {
                const payloadLimit = serverRes.payload.filter((element,index) => index < limit );
                res.send({status: 200, message: serverRes.message, payload: payloadLimit});
            }
        }
        else res.send({status: 400, message: serverRes.message});
    } catch (error) {
        throw new Error(error);
    }
}

const getProductByIdAsync = async (req, res) => {
    try {
        serverRes = await newProduct.getproductById(Number(req.params.pid));
        (!serverRes.error)
            ?   res.send({status: 200, message: serverRes.message, payload: serverRes.payload})
            :   res.send({status: 400, message: serverRes.message})

    } catch (error) {
        throw new Error(error);
    }
}

const addProductAsync = async (req,res) => {
    try {
        let serverRes = await newProduct.addProduct(req.body);
        (!serverRes.error)
            ?   res.send({status: 200, message: serverRes.message})
            :   res.send({status: 400, message: serverRes.message})
    } catch (error) {
        throw new Error(error);
    }
}

const updateProductAsync = async (req, res) => {
    try {
        let serverRes = await newProduct.updateProduct(req.params.pid,req.body);
        (!serverRes.error)
            ?   res.send({status: 200, message: serverRes.message})
            :   res.send({status: 400, message: serverRes.message})
    } catch (error) {
        throw new Error(error);
    }
}

const deleteProductAsync = async (req, res) => {
    try {
        let serverRes = await newProduct.deleteProduct(req.params.pid);
        (!serverRes.error)
            ?   res.send({status: 200, message: serverRes.message})
            :   res.send({status: 400, message: serverRes.message})
    } catch (error) {
        throw new Error(error);
    }
}