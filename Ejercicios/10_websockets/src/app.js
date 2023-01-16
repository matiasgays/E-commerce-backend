const express = require('express');
const app = express();
const { viewRouter } = require('./routes/viewRouter');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');

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
app.use('/', viewRouter);

const messages = [];

socketServer.on('connection', socket => {
    socket.on('char', char => {
        const socketFound = messages.find(element => element.id === socket.id);
        if (socketFound) {
            socketFound.message = char;
        } 
        else {
            messages.push( {
                id: socket.id,
                message: char
            })
        }
        console.log(messages);
        socketServer.emit('broadcast message',messages);
    })

    // socket.emit('response', 'Hello back from server side');

    // socketServer.emit('broadcast message', 'Hello everyone!!');
})