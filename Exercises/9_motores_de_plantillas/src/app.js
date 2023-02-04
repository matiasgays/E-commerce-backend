const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const { viewRouter } = require('./routes/viewsRouter')

app.engine('handlebars', handlebars.engine());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static( __dirname + '/public'))

app.use('/', viewRouter);

PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})