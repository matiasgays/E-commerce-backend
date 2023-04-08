import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import __dirname from "./utils.js";
import twilio from "twilio";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "ing.matiasgays@gmail.com",
    pass: "pwkmijenegtzmzrx",
  },
});

app.use("/mail", async (req, res) => {
  const serverRes = await transport.sendMail({
    from: "ing.matiasgays@gmail.com",
    to: "ing.matiasgays@gmail.com",
    subject: "Testing mailing",
    html: `
    <div>
        <h1>Hello world</h1>
        <img src="cid:logo"/>
        <input type="file" src="cid:contract">
    </div>`,
    attachments: [
      { filename: "Logo", path: __dirname + "/Image1.jpg", cid: "logo" },
      {
        filename: "contract",
        path: __dirname + "/MatiasGays_contrato.pdf",
        cid: "contract",
      },
    ],
  });
  res.send("mail sent");
});

app.get("/sms", async (req, res) => {
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const sms = await client.messages.create({
    body: "Hello from Twilio",
    from: TWILIO_PHONE_NUMBER,
    to: "+543492243518",
  });
  console.log(sms.sid);
  res.send({ status: 200, payload: "Twilio test" });
});

app.post("/sms", async (req, res) => {
  const { name, product } = req.body;
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const sms = await client.messages.create({
    body: `Hello ${name} thank you from buying ${product}`,
    from: TWILIO_PHONE_NUMBER,
    to: "+543492243518",
  });
  console.log(sms.sid);
  res.send({ status: 200, payload: "Twilio test" });
});
