const express = require('express');
const app = express();
const { Server, Socket } = require('socket.io');
const { indexRouter } = require('./routes/indexRouter');
const handlebars = require('express-handlebars');
const messages = [];

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static( __dirname + '/public'))
app.use('/', indexRouter);

io.on('connection', socket => {
    socket.on('log in', usr => {
        socket.broadcast.emit('new user', usr);
        socket.emit('chat logs', messages);
    })
    socket.on('send message', data => {
        messages.push(data);
        io.emit('messages', messages);    
    })
})
