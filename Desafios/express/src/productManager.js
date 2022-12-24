const fs = require('fs');

class ProductManager {
    static id = 0;
    constructor(path) {
        this.path = path;
        this.products = [];
    }
 
    getProducts = async () => {
        try {
            const data = await this.readInFile();
            return JSON.parse(data)
        } catch (error) {
            throw new Error(error);
        }
    }

    getproductById = async (id) => {
        let product;
        try {
            const data = await this.readInFile();
            const dataJSON = JSON.parse(data);
            const productFound = dataJSON.find(product => product.id === id);
                (productFound) 
                    ?   product = productFound
                    :   product = 'Id not found';
        } catch (error) {
            throw new Error(error);
        }
        return product;
    }

    addProduct = async (product) => {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) 
            return console.log(`arguments can't be falsy`);
        if (!this.products.some(product => product.code === code)) {
            this.products.push({
                'id': ProductManeger.id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
              })
            try {
                await this.writeInFile();
                return console.log('Product added successfully');
            } catch (error) {
                throw new Error(error);
            }
        }
        else {
            return console.log(`The product's code you are trying to add is already created`);
        }
    }

    updateProduct = async (id,obj) => {
        try {
            const data = await this.readInFile();
            const dataJSON = JSON.parse(data);
            dataJSON.forEach(element => {
                if(element.id === id) {
                        element.title = obj.title,
                        element.description = obj.description ?? element.description,
                        element.price = obj.price ?? element.price,
                        element.thumbnail = obj.thumbnail ?? element.thumbnail,
                        element.code = obj.code ?? element.code,
                        element.stock = obj.stock ?? element.stock
                }
            })
            this.products = [...dataJSON];
            try {
                await this.writeInFile();
                return console.log('Product updated successfully');
            } catch (error) {
                throw new Error(error);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            const data = await this.readInFile();
            const dataJSON = JSON.parse(data);
                const productFound = dataJSON.find(product => product.id === id);
                if (productFound) {
                    this.products = this.products.filter(product => product.id != id);
                    try {
                        await this.writeInFile();
                        return console.log('Product removed successfully');
                    } catch (error) {
                        throw new Error(error);
                    }
                } 
                else return console.log('Id not found');
        } catch (error) {
            throw new Error(error);
        }
    }

    writeInFile = async () => {
        try {
            await fs.promises.writeFile(this.path,JSON.stringify(this.products));
        } catch (err) {
            throw new Error(err);
        }
    }

    readInFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path,'utf-8');
            return data;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = {
    ProductManager
}

