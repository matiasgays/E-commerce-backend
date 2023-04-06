import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

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
    </div>`,
    attachments: [],
  });
  res.send("mail sent");
});
