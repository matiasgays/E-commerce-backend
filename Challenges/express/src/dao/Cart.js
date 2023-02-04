const { cartModel } = require('./models/cartModel.js');

class Cart {

    getCart = async () => {
        try {
            const mongoRes = await cartModel.find();
            return { message: "Cart found", payload: mongoRes };

        } catch (error) {
            throw new Error("Server failed to find cart");
        }
    }

    getCartById = async (cid) => {
        try {
            const mongoRes = await cartModel.findById(cid);
            return { message: "cid found", payload: mongoRes };

        } catch (error) {
            throw new Error("Could not found cid");
        }
    }

    addProductInCart = async (cart) => {
        const { id, quantity } = cart.products[0];

        if (!id || !quantity ) 
            return {error: 1, message: "arguments can't be falsy"};

        try {
            await cartModel.create(cart);
            return { error: 0, message: "product successfully added" };

        } catch (error) {
            throw new Error("Server failed to add product to cart");
        }
    }

    addProductInCartById = async (cid, pid) => {
        try {
            const mongoRes = await cartModel.findById(cid);
            const pidInCart = mongoRes.products.find(p => p.id === pid);

            if (pidInCart) {
                try {
                    const update = {$inc: {"products.$[elem].quantity": 1}};
                    await cartModel.updateOne({ _id: cid },update,{ arrayFilters: [{"elem.id": pid}] });
                    return { message: "Product is already in cart.  Product's quantity +1 successfully added" };
                
                } catch (error) {
                    throw new Error("Server failed to update pid in cart");
                }

            }
            else {
                try {
                    const insert = { $push: { products: { id: pid, quantity: 1 }}};
                    await cartModel.updateOne({ _id: cid }, insert);
                    return { message: "Product successfully added to cart" };

                } catch (error) {
                    throw new Error("Server failed to add product to cart");
                }
            }
            
        } catch (error) {
            throw new Error("Could not found cid");
        }
    }
}

module.exports = {
    Cart
}