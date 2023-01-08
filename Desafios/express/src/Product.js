const fs = require('fs');

class Product {
    maxId = 0;
    constructor(path) {
        this.path = path;
        this.products = [];
        this.cart = [];
    }
 
    getProducts = async () => {
        try {
            const data = await this.readInFile();
            const dataJSON = JSON.parse(data);
            if (!dataJSON) return {error: 1, message: "products is empty"};
            return {error: 0, message: "products found", payload: dataJSON};
        } catch (error) {
            throw new Error(error);
        }
    }

    getproductById = async (pid) => {
        try {
            const data = await this.readInFile();
            const dataJSON = JSON.parse(data);
            if (!dataJSON) return {error: 1, message: "products is empty"};
            const productFound = dataJSON.find(product => product.id === +pid);
            if (productFound) return {error: 0, message: "pid found", payload: productFound};
            else return {error: 1, message: "pid not found"};
        } catch (error) {
            throw new Error(error);
        }
    }

    addProduct = async (product) => {
        const { title, description, price, thumbnail, code, stock, status, category } = product;
        if (!title || !description || !price || !category || !code || !stock || !status) 
            return {error: 1, message: "arguments can't be falsy"};
        try {
            this.products = JSON.parse(await this.readInFile());
            this.products.forEach(element => {
                if (element.id > this.maxId)
                    this.maxId = element.id;
            })
        } catch (error) {
            throw new Error(error);
        }
        if (!this.products.some(product => product.code === code)) {
            this.products.push({
                id: ++this.maxId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                status,
                category
              })
            try {
                await this.writeInFile();
                return {error: 0, message: "product added successfully"};
            } catch (error) {
                throw new Error(error);
            }
        }
        else {
            return {error: 1, message: "The product's code you are trying to add is already created"};
        }
    }

    updateProduct = async (pid,obj) => {
        let idFound = false;
        try {
            const data = await this.readInFile();
            const dataJSON = JSON.parse(data);
            dataJSON.forEach(element => {
                if(element.id === +pid) {
                    idFound = true;
                    element.title = obj.title,
                    element.description = obj.description ?? element.description,
                    element.price = obj.price ?? element.price,
                    element.thumbnail = obj.thumbnail ?? element.thumbnail,
                    element.code = obj.code ?? element.code,
                    element.stock = obj.stock ?? element.stock,
                    element.status = obj.status ?? element.status,
                    element.category = obj.category ?? element.category    
                }
            })
            if (idFound) {
                this.products = [...dataJSON];
                try {
                    await this.writeInFile();
                    return {error: 0, message: "product updated successfully"};
                } catch (error) {
                    throw new Error(error);
                }
            }
            else return {error: 1, message: "Id not found"};
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteProduct = async (pid) => {
        let idFound = false;
        try {
            const data = await this.readInFile();
            const dataJSON = JSON.parse(data);
            this.products = dataJSON.filter(product => product.id != +pid);
            if (this.products.length != dataJSON.length) {
                try {
                    await this.writeInFile();
                    return {error: 0, message: "product deleted successfully"};
                } catch (error) {
                    throw new Error(error);
                }
            }
            else return {error: 1, message: "Id not found"};
        } catch (error) {
            throw new Error(error);
        }
    }

    writeInFile = async () => {
        try {
            console.log(this.products);
            await fs.promises.writeFile(this.path,JSON.stringify(this.products));
        } catch (err) {
            throw new Error(err);
        }
    }

    readInFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path,'utf-8');
            if (data) return data;
            return 0;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = {
    Product
}

