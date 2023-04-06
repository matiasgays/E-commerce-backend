import config from "../config/config.js";
import mongoose from "mongoose";

const persistence = process.argv[2];
export let Contacts;

switch (persistence) {
  case "MONGO":
    connectDatabase();
    const { default: ContactsMongo } = await import(
      "./mongo/contacts.mongo.js"
    );
    Contacts = ContactsMongo;
    console.log("connected to mongo");
    break;
  case "MEMORY":
    const { default: ContactsMemory } = await import(
      "./memory/contacts.memory.js"
    );
    Contacts = ContactsMemory;
    console.log("connected to memory");
    break;
  default:
    connectDatabase();
    const { default: ContactsDefault } = await import(
      "./mongo/contacts.mongo.js"
    );
    Contacts = ContactsDefault;
}

async function connectDatabase() {
  const MONGO_USER_NAME = process.env.MONGO_USER_NAME;
  const MONGO_PSW = process.env.MONGO_PSW;
  const MONGO_DATABASE = "class_28";
  const uri = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PSW}@cluster0.kpm0q.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri);
    return console.log("connected to database");
  } catch (error) {
    console.log({
      status: 500,
      message: "Cannot connect to database: " + error,
    });
  }
}
