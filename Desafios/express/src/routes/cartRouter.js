const express = require("express");
const cartRouter = express.Router();
const { Cart } = require('../Cart');
const path =  './src/db/cart.json';

const cart = new Cart(path);

cartRouter.get('/',(req, res, next) => {
    getCartAsync(req, res);
});

cartRouter.get('/:cid',(req, res, next) => {
    getCartByIdAsync(req, res);
});

cartRouter.post('/', (req, res) => {
    addProductInCartAsync(req, res);
})

cartRouter.post('/:cid/product/:pid', (req, res) => {
    addProductInCartByIdAsync(req, res);
})

module.exports = {
    cartRouter
}

const getCartAsync = async (req, res) => {
    try {
        let serverRes = await cart.getCart();
        (!serverRes.error)
        ?   res.send({status: 200, message: serverRes.message, payload: serverRes.payload})
        :   res.send({status: 400, message: serverRes.message})
    } catch (error) {
        throw new Error(error);
    }
}

const getCartByIdAsync = async (req, res) => {
    try {
        let serverRes = await cart.getCartById(Number(req.params.cid));
        (!serverRes.error)
            ?   res.send({status: 200, message: serverRes.message, payload: serverRes.payload})
            :   res.send({status: 400, message: serverRes.message})
    } catch (error) {
        throw new Error(error);
    }
}

const addProductInCartAsync = async (req, res) => {
    try {
        let serverRes = await cart.addProductInCart(req.body);
        (!serverRes.error)
            ?   res.send({status: 200, message: serverRes.message})
            :   res.send({status: 400, message: serverRes.message})
    } catch (error) {
        throw new Error(error);
    }
}

const addProductInCartByIdAsync = async (req, res) => {
    try {
        let serverRes = await cart.addProductInCartById(req.params.cid, req.params.pid);
        (!serverRes.error)
            ?   res.send({status: 200, message: serverRes.message})
            :   res.send({status: 400, message: serverRes.message})
    } catch (error) {
        throw new Error(error);
    }
}