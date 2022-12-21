const fs = require('fs');
const { stringify } = require('querystring');
const { setInterval } = require('timers/promises');

class Manager {
    constructor(){
        this.users = [];
    };

    addUser = (name, lastName, age, course) => {
        this.users.push({
            name,
            lastName,
            age,
            course
        })
        this.newFile('Users.json',JSON.stringify(this.users));
    }

    getUsers = () => {
      const data = this.getFile('Users.json');
      return data;
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

manager.addUser('matias','gays',29,'math');
manager.addUser('matias','gays',29,'math');
manager.getUsers();
