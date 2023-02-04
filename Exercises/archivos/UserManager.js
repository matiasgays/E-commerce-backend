const fs = require('fs');
const crypto = require('crypto');
const { stringify } = require('querystring');
const { setInterval } = require('timers/promises');

class Manager {
    constructor(){
        this.users = [];
    };

    addUser = (user) => {
      const { name, lastName, userName, password } = user;
        this.users.push({
            name,
            lastName,
            userName,
            password : crypto.createHash('sha256').update(password).digest('hex')
        })
        this.newFile('Users.json',JSON.stringify(this.users));
    }

    getUsers = () => {
      return this.getFile('Users.json');
    }

    loggin = (name, psw) => {
      const userFound = this.users.find(user => user.userName === name)
      if (userFound) {
        (crypto.createHash('sha256').update(psw).digest('hex') === userFound.password)
          ? console.log('Loggin')
          : console.log('Password incorrect')
      }
      else return console.log('UserName not found');
    }

    newFile = async (file, data) => {
      try {
        await fs.promises.writeFile(file,data)
      }
      catch (err) {
        throw new Error(err);
      }
    }

    getFile = async (path) => {
      try {
        console.log(await fs.promises.readFile(path,'utf-8'));
      }
      catch (err) {
        throw new Error(err);
      }
    }
}

const manager = new Manager();

const user1 = {
  name: 'matias',
  lastName: 'gays',
  userName: 'mello',
  password: '1234'
}

const user2 = {
  name: 'foo',
  lastName: 'bar',
  userName: 'foobar',
  password: 'qwer'
}

manager.addUser(user1);
manager.addUser(user2);
manager.getUsers();
setTimeout(() => manager.loggin('mello','1234')
  ,1000);

