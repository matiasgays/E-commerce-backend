const fs = require('fs');

class ProductManeger {
    static id = 0;
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    getProducts() {
        this.readInFile()
            .then(data => {console.log(JSON.parse(data))})
            .catch(err => console.log(err));
    }

    getproductById(id) {
        this.readInFile()
            .then(data => {
                const dataJSON = JSON.parse(data);
                const productFound = dataJSON.find(product => product.id === id);
                productFound 
                    ? console.log(productFound) 
                    : console.log('Id not found');
            })
            .catch (err => console.log(err));
        return;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
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
            this.writeInFile()
                .then(() => console.log('Product added successfully'))
                .catch (err => console.log(err));
        }
        else {
            console.log(`The product's code you are trying to add is already created`);
        }
        return;
    }

    updateProduct(id,obj) {
        this.readInFile()
        .then(data => {
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
            this.writeInFile()
                .then(() => console.log('Product updated successfully'))
                .catch (err => console.log(err));
        })
        .catch (err => console.log(err));
        return;
    }

    deleteProduct(id) {
        this.readInFile()
            .then(data => {
                const dataJSON = JSON.parse(data);
                const productFound = dataJSON.find(product => product.id === id);
                if (productFound) {
                    this.products = this.products.filter(product => product.id != id);
                    this.writeInFile().then(() => console.log('Product removed successfully'));
                } 
                else console.log('Id not found');
                return;
            })
            .catch (err => console.log(err));
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

const newproductManeger = new ProductManeger('./productList.json');
newproductManeger.addProduct('trainers','black&white',300,'/images/trainer.jpg',100221,24);
newproductManeger.addProduct('','',300,'/images/trainer.jpg',100221,24);
newproductManeger.addProduct('trainers','black&white',220,'/images/trainer.jpg',10022,24);
newproductManeger.updateProduct(1,{title: 'sport trainers', price: 400});
// newproductManeger.getproductById(1);
// newproductManeger.getProducts();
// newproductManeger.getproductById(2);
// newproductManeger.deleteProduct(1);
setTimeout(() => newproductManeger.getProducts(),1000);

