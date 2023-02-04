const { productModel } = require('./models/productModel');

class Product {
    getProducts = async () => {
        try {
            const mongoRes = await productModel.find();
            return { message: "Products found", payload: mongoRes };

        } catch (error) {
            throw new Error("Server failed to find products");
        }
    }

    getProductById = async (pid) => {
        try {
            const mongoRes = await productModel.findById(pid);
            return { message: "pid found", payload: mongoRes };

        } catch (error) {
            throw new Error("Could not found pid");
        }
    }

    addProduct = async (product) => {
        const { title, description, price, thumbnail, code, stock, status, category } = product;

        if (!title || !description || !price || !thumbnail || !category || !code || !stock || !status) 
            return { error: 1, message: "arguments can't be falsy" };

        try {
            const mongoRes = await productModel.findOne({ code: code });
            if (mongoRes) return { error: 1, message: "The product's code you are trying to add is already created" };
            
            try {
                await productModel.create(product);
                return { error: 0, message: "product successfully added" };

            } catch (error) {
                throw new Error("Server failed to add product");
            }
            
        } catch (error) {
            throw new Error("Server failed to find product");
        }
    }

    updateProduct = async (pid,obj) => {
        try {
            const mongoRes = await productModel.findByIdAndUpdate(pid, obj);
            if (!mongoRes) return { error: 1, message: "Could not found pid" };
            return { error: 0, message: "product successfully updated" };

        } catch (error) {
            throw new Error("Server failed to update product");
        }
    }

    deleteProduct = async (pid) => {
        try {
            const mongoRes = await productModel.findByIdAndRemove(pid);
            if (!mongoRes) return { error: 1, message: "Could not found pid" };
            return { error: 0, message: "product successfully deleted" };

        } catch (error) {
            throw new Error("Server failed to delete product");
        }
    }
}

module.exports = {
    Product
}