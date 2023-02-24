import express from "express";
import userModel from "../models/userModel.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.render("login", { style: "login.css" });
  });
});

loginRouter.post("/", async (req, res) => {
  const { uname, psw } = req.body;

  try {
    const mongoRes = await userModel.findOne({
      $and: [{ email: uname, password: psw }],
    });
    if (mongoRes) {
      req.session.user = uname;
      req.session.firstName = mongoRes.firstName;
      req.session.lastName = mongoRes.lastName;
      req.session.age = mongoRes.age;
      return res.status(200).json({ message: "Authentication succed" });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    res.send({ status: 500, message: error });
  }
});

export default loginRouter;
