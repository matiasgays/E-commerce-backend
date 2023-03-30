export default class ContactDTO {
  constructor(contact) {
    this.fullName = contact.fullName;
    this.email = contact.email;
    this.phone = contact.phone ? contact.phone.split("-").join("") : "";
  }
}
