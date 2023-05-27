import { handleRes } from "../utils/utils.js";
import userModel from "../dao/mongoDB/models/user.model.js";

export const toggleUserPremium = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findById(uid);
    if (!user) return handleRes(req, res, 404, "UID not found");
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
