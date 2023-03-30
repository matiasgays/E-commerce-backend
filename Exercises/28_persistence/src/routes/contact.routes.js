import express from "express";
import { contactsService } from "../repository/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res) => {
  const result = await contactsService.getContacts();
  res.send({ status: 200, payload: result });
});

contactsRouter.post("/", async (req, res) => {
  const result = await contactsService.createContact(req.body);
  res.send({ status: 200, payload: result });
});

contactsRouter.put("/", async (req, res) => {
  const result = await newContact.update(req.body.email, req.body);
  res.send({ status: 200, payload: result });
});

contactsRouter.delete("/", async (req, res) => {
  const result = await newContact.delete(req.body.email);
  res.send({ status: 200, payload: result });
});

export default contactsRouter;
