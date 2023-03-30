import contactsModel from "./models/Contacts.js";

export default class Contacts {
  constructor() {}

  get = async () => {
    return await contactsModel.find();
  };

  post = async (contact) => {
    return await contactsModel.create(contact);
  };

  update = async (email, contact) => {
    return await contactsModel.findOneAndUpdate(email, contact);
  };

  delete = async (email) => {
    return await contactsModel.findOneAndDelete(email);
  };
}
