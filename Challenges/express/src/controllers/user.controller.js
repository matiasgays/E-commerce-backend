import nodemailer from "nodemailer";

import { handleRes } from "../utils/utils.js";
import userModel from "../dao/mongoDB/models/user.model.js";
import { UserPublicDTO } from "../dao/DTO/user.dto.js";

export const toggleUserPremium = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findById(uid);
    if (!user) return handleRes(req, res, 404, "UID not found");
    if (user.role === "ADMIN")
      return handleRes(req, res, 406, "Admin role can not be updated");
    const newRole = user.role === "USER" ? "USER_PREMIUM" : "USER";
    if (newRole === "USER_PREMIUM") {
      const hasRequiredDocuments = checkRequiredDocuments(user.documents);
      if (!hasRequiredDocuments)
        return handleRes(
          req,
          res,
          404,
          "Incomplete documents, cannot be a premium user"
        );
    }
    await userModel.findByIdAndUpdate(uid, { $set: { role: newRole } });
    return handleRes(req, res, 200, `Your user role is now ${newRole}`);
  } catch (error) {
    return handleRes(req, res, 500, error);
  }
};

export const uploadDocuments = async (req, res) => {
  const { uid } = req.params;
  let documents = [];
  if (!req.files) return handleRes(req, res, 406, "Files are required");
  const { profile, products, ID, proofAddress, proofBankAccount } = req.files;
  const files = [profile, products, ID, proofAddress, proofBankAccount];
  files.forEach((file) => {
    if (!file) return;
    const newDocument = {
      name: file[0].fieldname,
      reference: file[0].path,
    };
    documents.push(newDocument);
  });
  await userModel.findByIdAndUpdate(uid, {
    $set: { documents: documents },
  });
  handleRes(req, res, 200, "Files successfully uploaded");
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    const publicUser = UserPublicDTO.getUsers(users);
    handleRes(req, res, 200, publicUser);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const deleteInactiveUsers = async (req, res) => {
  try {
    const { code, payload } = await checkInactiveUsers();
    handleRes(req, res, code, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { uid } = req.body;
    const payload = await userModel.findOne({ _id: uid });
    console.log(payload);
    handleRes(req, res, 200, payload);
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { uid } = req.body;
    await userModel.deleteOne({ _id: uid });
    handleRes(req, res, 200, "User deleted successfully");
  } catch (error) {
    handleRes(req, res, 500, error);
  }
};

function checkRequiredDocuments(documents) {
  const requiredDocuments = ["ID", "proofAddress", "proofBankAccount"];
  let totalValidDocuments = 0;
  for (const doc of requiredDocuments) {
    documents.filter((document) => {
      if (document.name === doc) totalValidDocuments++;
    });
  }
  return totalValidDocuments == requiredDocuments.length ? true : false;
}

async function checkInactiveUsers() {
  let date = new Date();
  date.setDate(date.getDate() - 2);
  const UsersEmails = [];
  try {
    const users = await userModel.find();
    users.forEach(async (user) => {
      if (user.lastConnection < date) {
        UsersEmails.push(user.email);
        try {
          await userModel.deleteOne({ email: user.email });
        } catch (error) {
          return { code: 500, payload: error };
        }
      }
    });
    if (UsersEmails.length > 0) sendEmail(UsersEmails);
    return { code: 200, payload: "Inactive users deleted successfully" };
  } catch (error) {
    handleRes(req, res, 500, error);
  }
}

const sendEmail = (emails) => {
  emails.forEach(async (email) => {
    try {
      const transport = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: "ing.matiasgays@gmail.com",
          pass: "pwkmijenegtzmzrx",
        },
      });
      await transport.sendMail({
        from: "ing.matiasgays@gmail.com",
        to: user,
        subject: "Accoun deleted",
        html: `
    <div>
        Your account was deleted due to a 2 days of inactivity 
    </div>`,
        attachments: [],
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  return;
};
