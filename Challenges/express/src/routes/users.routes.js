import Routers from "./router.js";
import userModel from "../dao/mongoDB/models/user.model.js";

class UserRouter extends Routers {
  init() {
    this.get("/premium/:uid", ["USER", "USER_PREMIUM"], async (req, res) => {
      const { uid } = req.params;
      try {
        const user = await userModel.findById(uid);
        if (!user) return res.status(404).send({ error: "UID not found" });
        const newRole = user.role === "USER" ? "USER_PREMIUM" : "USER";
        await userModel.findByIdAndUpdate(uid, {
          $set: { role: newRole },
        });
        return res
          .status(200)
          .send({ payload: `Your user role is now ${newRole}` });
      } catch (error) {
        return res.status(500).send({ error: "Server error" });
      }
    });
  }
}

export default UserRouter;
