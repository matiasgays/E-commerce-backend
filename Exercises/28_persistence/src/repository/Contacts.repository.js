import ContactDTO from "../dao/DTO/contact.dto.js";
export default class ContactsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getContacts = async () => {
    const result = await this.dao.get();
    return result;
  };

  createContact = async (contact) => {
    const { fullName, email, phone } = contact;
    const contactDTO = new ContactDTO({ fullName, email, phone });
    const result = await this.dao.post(contactDTO);
    return result;
  };
}
