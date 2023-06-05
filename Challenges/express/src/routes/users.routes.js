import Routers from "./router.js";
import {
  toggleUserPremium,
  uploadDocuments,
  getUsers,
  deleteInactiveUsers,
  getUserById,
  deleteUserById,
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
    this.get("/admin", ["ADMIN"], (req, res) => {
      return res.render("userAdmin", { style: "userAdmin.css" });
    });
    this.get("/user", ["USER", "USER_PREMIUM", "ADMIN"], (req, res) => {
      res.send({ status: 200, payload: req.user });
    });
    this.get("/admin/json", ["ADMIN"], getUsers);
    this.get("/admin/:uid", ["ADMIN"], (req, res) => {
      return res.render("adminHomePage", { style: "adminHomePage.css" });
    });
    this.post("/admin", ["ADMIN"], getUserById);
    this.get(
      "/premium/:uid",
      ["USER", "USER_PREMIUM", "ADMIN"],
      toggleUserPremium
    );
    this.post(
      "/:uid/documents",
      ["USER", "USER_PREMIUM"],
      multerMiddleware,
      uploadDocuments
    );

    this.delete("/", ["ADMIN"], deleteInactiveUsers);
    this.delete("/:uid", ["ADMIN"], deleteUserById);
  }
}

export default UserRouter;
