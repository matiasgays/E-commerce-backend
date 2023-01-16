const express = require('express');
const app = express();
const { productRouter } = require('./routes/productsRouter');
const { cartRouter } = require('./routes/cartRouter');
const { viewRouter } = require('./routes/viewRouter');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static( __dirname + '/public'))

app.use('/products',productRouter);
app.use('/cart',cartRouter);
app.use('/', viewRouter);

socketServer.on('connection', socket => {
    const products = fs.readFileSync('./src/products.json', "utf8");
    const productsJSON = JSON.parse(products);
    socket.emit('list', productsJSON);
});

// app.post('/', (req, res) => {
//     console.log('hello');
//     let newProduct = {id: uuidv4()};
//     for (let key in req.body) {
//         newProduct = {...newProduct, [key]: req.body[key]};
//     }
//     res.render('/realTimeProducts', {style: 'index.css'} );
//     socketServer.emit('list', newProduct);
// });