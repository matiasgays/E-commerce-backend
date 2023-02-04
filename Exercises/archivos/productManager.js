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

const newproductManager = new ProductManager('./productList.json');
const product1 = {
    title: 'trainers',
    description: 'black&white',
    price: 300,
    thumbnail: '/images/trainer.jpg',
    code: 100221,
    stock: 24 
}

const product2 = {
    ...product1, price: 200, code: 1002223
}

const getProductsAsync = async () => {
    try {
        const data = await newproductManager.getProducts();
        console.log(data);
    } catch (error) {
        throw new Error(error);
    }
}

const getProductByIdAsync = async (id) => {
    try {
        const data = await newproductManager.getproductById(id);
        console.log(data);
    } catch (error) {
        throw new Error(error);
    }
}

const addProductAsync = async (prod) => {
    try {
        await newproductManager.addProduct(prod);
    } catch (error) {
        throw new Error(error);
    }
}

const deleteProductAsync = async (id) => {
    try {
        await newproductManager.deleteProduct(id);
    } catch (error) {
        throw new Error(error);
    }
}

const updateProductAsync = async (id,prod) => {
    try {
        await newproductManager.updateProduct(id,prod);
    } catch (error) {
        throw new Error(error);
    }
}

// addProductAsync(product1);
// addProductAsync(product2);
// setTimeout(() => deleteProductAsync(0),1000);
// setTimeout(() => updateProductAsync(1,{title : 'socks'}),1500);
// setTimeout(() => getProductByIdAsync(1),2000);

module.exports = {
    ProductManager
}

