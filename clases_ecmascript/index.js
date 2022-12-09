class ProductManeger {
    static id = 0;
    constructor() {
        this.products = [];
    }

    getProducts() {
        return console.log([...this.products]);
    }

    getproductById(id) {
        const productFound = this.products.find(product => product.id === id);
        productFound 
            ? console.log(productFound) 
            : console.log('Id not found');
        return;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) 
            return console.log(`arguments can't be falsy`);
        this.products.some(product => product.code === code)
            ? console.log(`The product's code you are trying to add is already created`)
            : this.products.push({
                'id': ProductManeger.id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
              })
        return;
    }

}

const newproductManeger = new ProductManeger();
newproductManeger.getProducts();
newproductManeger.addProduct('trainers','black&white',300,'/images/trainer.jpg',100221,24);
newproductManeger.addProduct('','',300,'/images/trainer.jpg',100221,24);
newproductManeger.addProduct('trainers','black&white',220,'/images/trainer.jpg',10022,24);
newproductManeger.getProducts();
newproductManeger.getproductById(1);
newproductManeger.getproductById(2);