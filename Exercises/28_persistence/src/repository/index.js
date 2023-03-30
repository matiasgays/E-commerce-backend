import { Contacts } from "../dao/factory.js";
import ContactsRepository from "./Contacts.repository.js";

export const contactsService = new ContactsRepository(new Contacts());
