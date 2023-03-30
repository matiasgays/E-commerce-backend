export default class Contacts {
  constructor() {
    this.data = [];
  }

  get = async () => {
    return this.data;
  };

  post = async (contact) => {
    this.data.push(contact);
    return contact;
  };

  update = async (email, contact) => {
    const index = this.data.findIndex((cnt) => cnt.email === email);
    this.data[index] = contact;
    return contact;
  };

  delete = async (email) => {
    const index = this.data.findIndex((cnt) => cnt.email === email);
    this.data.splice(index, 1);
    return { email };
  };
}
