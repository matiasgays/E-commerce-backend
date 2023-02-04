const express = require('express');
const viewRouter = express.Router();
const { User } = require('../Users');

const user1 = new User('matias','gays',29,'mati@gmail.com',123456, 'admin');
const user2 = new User('mati','gays',29,'mati@gmail.com',123455, 'user');
const user3 = new User('mello','gays',29,'mati@gmail.com',123455, 'user');
const user4 = new User('matias e','gays',29,'mati@gmail.com',123455, 'user');
const user5 = new User('matias edu','gays',29,'mati@gmail.com',123455, 'admin');

const users = [user1,user2,user3,user4,user5];

viewRouter.get('/', (req, res) => {
    let random = Math.round(Math.random() * 4);
    res.render('index', {isAdmin: users[random].role === 'admin', user: users[random], style: 'index.css'});
});

viewRouter.get('/login', (req, res) => {
    res.render('register');
})

viewRouter.post('/api/login', (req, res) => {
    const user = {
        name: req.body.fname,
        mail: req.body.mail,
        password: req.body.psw
    };
    console.log(user);
    res.send({status: 200, message: 'Login successfull'});
})

module.exports = {
    viewRouter
}