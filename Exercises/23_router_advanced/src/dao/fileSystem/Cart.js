const fs = require('fs');

class Cart {
    maxId = 0;
    constructor(path) {
        this.path = path;
        this.cart = [];
    }

    getCart = async () => {
        try {
            const data = await this.readInFile();
            const dataJSON = JSON.parse(data);
            if (!dataJSON) return {error: 1, message: "cart is empty"};
            return {error: 0, message: "cart found", payload: dataJSON};
        } catch (error) {
            throw new Error(err); 
        }
    }

    getCartById = async (cid) => {
        try {
            const data = await this.readInFile();
            const dataJSON = JSON.parse(data);
            if (!dataJSON) return {error: 1, message: "cart is empty"};
            const cartFound = dataJSON.find(c => c.id === +cid);
            if (cartFound) return {error: 0, message: "cid found", payload: cartFound};
            else return {error: 1, message: "cid not found"};
        } catch (error) {
            throw new Error(err); 
        }
    }

    addProductInCart = async (body) => {
        try {
            this.cart = JSON.parse(await this.readInFile());
            this.cart.forEach(element => {
                if (element.id > this.maxId)
                    this.maxId = element.id;
            })
        } catch (error) {
            throw new Error(error);
        }
        if (body.products) {
            this.cart.push({
                id: ++this.maxId,
                products: body.products
                })
            try {
                await this.writeInFile();
                return {error: 0, message: "Product added succesfully"};
            } catch (error) {
                throw new Error(error);
            }
        }
        else return {error: 1, message: "Add one product to the body"}
    }

    addProductInCartById = async (cid, pid) => {
        try {
            this.cart = JSON.parse(await this.readInFile());
        } catch (error) {
            throw new Error(error);
        }
        const cidFound = this.cart.find(c => c.id === +cid);
        if (cidFound) {
            const pidFound = cidFound.products.find(p => p.id === +pid);
            if (pidFound) {
                pidFound.quantity++;
                try {
                    await this.writeInFile();
                    return {error: 0, message: "Product is already in cart.  Product's quantity +1"};
                } catch (error) {
                    throw new Error(error);
                }
            }
            else {
                cidFound.products.push({
                    id: +pid,
                    quantity: 1
                });
                await this.writeInFile();
                return {error: 0, message: "Product added to cart"};
            }
        }
        else return {error: 1, message: "cid not found"}
    }

    writeInFile = async () => {
        try {
            await fs.promises.writeFile(this.path,JSON.stringify(this.cart));
        } catch (err) {
            throw new Error(err);
        }
    }

    readInFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path,'utf-8');
            if (data) return data;
            return 0;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = {
    Cart
}