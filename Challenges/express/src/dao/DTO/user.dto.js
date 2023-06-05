export default class UserDTO {
  constructor(user) {
    this.fullName = user.firstName + user.lastName;
    this.admin = user.role === "admin" ? true : false;
  }
}

export class UserPublicDTO {
  constructor(user) {
    this.fullName = user.firstName + user.lastName;
    this.email = user.email;
    this.role = user.role;
  }

  static getUsers(users) {
    const publicUsers = [];
    users.forEach((user) => {
      const newUser = new UserPublicDTO(user);
      publicUsers.push(newUser);
    });
    return publicUsers;
  }
}
