import Routers from "./router.js";
import {
  toggleUserPremium,
  uploadDocuments,
} from "../controllers/user.controller.js";
import { uploader } from "../utils/utils.js";

const multerMiddleware = uploader.fields([
  { name: "profile" },
  { name: "products" },
  { name: "ID" },
  { name: "proofAddress" },
  { name: "proofBankAccount" },
]);

class UserRouter extends Routers {
  init() {
    this.get("/premium/:uid", ["USER", "USER_PREMIUM"], toggleUserPremium);
    this.post(
      "/:uid/documents",
      ["USER", "USER_PREMIUM"],
      multerMiddleware,
      uploadDocuments
    );
  }
}

export default UserRouter;
