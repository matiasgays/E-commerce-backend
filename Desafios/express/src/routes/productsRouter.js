const express = require("express");
const productsRouter = express.Router();
const { Product } = require('../dao/Product');

const newProduct = new Product();

productsRouter.get('/',(req, res, next) => {
    getProductsAsync(req, res);
});

productsRouter.get('/:pid',(req, res) => {
    getProductByIdAsync(req, res);
});

productsRouter.post('/', (req,res) => {
    addProductAsync(req,res);
})

productsRouter.put('/:pid',(req, res) => {
    updateProductAsync(req, res);
})

productsRouter.delete('/:pid',(req, res) => {
    deleteProductAsync(req, res);
})

module.exports = {
    productsRouter
}

const getProductsAsync = async (req, res) => {
    try {
        const serverRes = await newProduct.getProducts();
        res.send({status: 200, message: serverRes.message, payload: serverRes.payload});

    } catch (error) {
        res.send({ status: 500, message: 'Could not get products: '+error });
    }
}

const getProductByIdAsync = async (req, res) => {
    try {
        const serverRes = await newProduct.getProductById(req.params.pid);
        res.send({ status: 200, message: serverRes.message, payload: serverRes.payload });

    } catch (error) {
        res.send({ status: 500, message: 'Could not get products: '+error });
    }
}

const addProductAsync = async (req,res) => {
    try {
        const serverRes = await newProduct.addProduct(req.body);
        (!serverRes.error)
            ?   res.send({ status: 200, message: serverRes.message })
            :   res.send({ status: 400, message: serverRes.message })
    } catch (error) {
        res.send({ status: 500, message: 'Could not add product: '+error });
    }
}

const updateProductAsync = async (req, res) => {
    try {
        const serverRes = await newProduct.updateProduct(req.params.pid,req.body);
        (!serverRes.error)
        ?   res.send({ status: 200, message: serverRes.message })
        :   res.send({ status: 400, message: serverRes.message })

    } catch (error) {
        res.send({ status: 500, message: 'Could not update product: '+error });
    }
}

const deleteProductAsync = async (req, res) => {
    try {
        const serverRes = await newProduct.deleteProduct(req.params.pid);
        (!serverRes.error)
        ?   res.send({ status: 200, message: serverRes.message })
        :   res.send({ status: 400, message: serverRes.message })

    } catch (error) {
        res.send({status: 500, message: 'Could not delete product: '+error});
    }
}