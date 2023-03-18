export default class UsersDaoLocal {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  saveUser(user) {
    this.users.push(user);
  }
}
