import Routers from "./router.js";
import passport from "passport";
import resetPasswordModel from "../dao/mongoDB/models/resetPassword.model.js";
import nodemailer from "nodemailer";
import { createToken, createHash, isValidPassword } from "../utils/utils.js";
import dotenv from "dotenv";
import userModel from "../dao/mongoDB/models/user.model.js";
import { handleRes } from "../utils/utils.js";

class ResetPasswordRouter extends Routers {
  init() {
    this.get("/", ["PUBLIC"], async (req, res) => {
      res.render("resetPassword", { style: "resetPassword.css" });
    });

    this.get("/:token", ["PUBLIC"], async (req, res) => {
      res.render("resetPasswordConfirm", { style: "resetPasswordConfirm.css" });
    });

    this.post(
      "/",
      ["PUBLIC"],
      passport.authenticate("resetPassword"),
      async (req, res) => {
        const token = createToken();
        try {
          await resetPasswordModel.create({
            email: req.user.email,
            token,
          });
          sendEmail(token);

          return handleRes(
            req,
            res,
            200,
            "Email was sent to your email account to reset your password"
          );
        } catch (error) {
          throw new Error(error);
        }
      }
    );

    this.post("/:token", ["PUBLIC"], async (req, res) => {
      const { token } = req.params;
      const { password } = req.body;
      try {
        const reset = await resetPasswordModel.findOne({ token });
        if (!reset) {
          return handleRes(req, res, 400, "Invalidad token");
        }
        if (new Date() > reset.expiration) {
          await resetPasswordModel.deleteOne({ token });
          return handleRes(req, res, 403, "Token expired");
        }
        const user = await userModel.findOne({ email: reset.email });
        if (isValidPassword(user, password)) {
          return handleRes(req, res, 406, "New password must be different");
        }
        await userModel.updateOne(
          { email: reset.email },
          { $set: { password: createHash(password) } }
        );
        await resetPasswordModel.deleteOne({ token });
        return handleRes(req, res, 200, "Password successfully updated");
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}

export default ResetPasswordRouter;

const sendEmail = async (token) => {
  dotenv.config();
  const MAIL_USER = process.env.MAIL_USER;
  const MAIL_PSW = process.env.MAIL_PSW;
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PSW,
    },
  });
  await transport.sendMail({
    from: "ing.matiasgays@gmail.com",
    to: "ing.matiasgays@gmail.com",
    subject: "Testing mailing",
    html: `
            <div>
                <h1>Reset Password</h1>
                <div>
                  <p>You have 1 hour to <a href="http://127.0.0.1:8080/reset-password/${token}">reset your password</a>
                </div>
            </div>`,
    attachments: [],
  });
};
