const express = require('express');
const { productRouter } = require('./routes/productsRouter');
const { cartRouter } = require('./routes/cartRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/products',productRouter);
app.use('/cart',cartRouter);

app.listen(8080, console.log('Server listening in port :8080'));