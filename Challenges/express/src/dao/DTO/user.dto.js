export default class UserDTO {
  constructor(user) {
    this.fullName = user.firstName + user.lastName;
    this.admin = user.role === "admin" ? true : false;
  }
}
