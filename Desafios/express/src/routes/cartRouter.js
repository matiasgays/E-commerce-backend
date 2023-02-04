const express = require("express");
const cartRouter = express.Router();
const { Cart } = require('../dao/Cart.js');

const cart = new Cart();

cartRouter.get('/',(req, res, next) => {
    getCartAsync(req, res);
});

cartRouter.get('/:cid',(req, res, next) => {
    getCartByIdAsync(req, res);
});

cartRouter.post('/', (req, res) => {
    addProductInCartAsync(req, res);
})

cartRouter.put('/:cid/product/:pid', (req, res) => {
    addProductInCartByIdAsync(req, res);
})

module.exports = {
    cartRouter
}

const getCartAsync = async (req, res) => {
    try {
        const serverRes = await cart.getCart();
        res.send({ status: 200, message: serverRes.message, payload: serverRes.payload });

    } catch (error) {
        res.send({ status: 500, message: 'Cannot get cart: '+error });
    }
}

const getCartByIdAsync = async (req, res) => {
    try {
        const serverRes = await cart.getCartById(req.params.cid);
        res.send({ status: 200, message: serverRes.message, payload: serverRes.payload });

    } catch (error) {
        res.send({ status: 500, message: 'Cannot get cart: '+error });
    }
}

const addProductInCartAsync = async (req, res) => {
    try {
        console.log(req.body);
        const serverRes = await cart.addProductInCart(req.body);
        (!serverRes.error)
            ?   res.send({ status: 200, message: serverRes.message })
            :   res.send({ status: 400, message: serverRes.message })

    } catch (error) {
        res.send({ status: 500, message: 'Could not add product to cart: '+error });
    }
}

const addProductInCartByIdAsync = async (req, res) => {
    try {
        const serverRes = await cart.addProductInCartById(req.params.cid, req.params.pid);
        res.send({ status: 200, message: serverRes.message });

    } catch (error) {
        res.send({ status: 500, message: 'Could not add product to cart: '+error });
    }
}

