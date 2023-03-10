import passport from "passport";
import local from "passport-local";
import userModel from "../models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";

const localStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "signup",
    new localStrategy({ usernameField: "email" }, async (uname, psw, done) => {
      try {
        const user = await userModel.findOne({ email: uname });
        if (user) {
          console.log("User already exists");
          return done(null, false);
        }
        const newUser = {
          email: uname,
          password: createHash(psw),
        };
        const result = await userModel.create(newUser);
        return done(null, result);
      } catch (error) {
        throw new Error(error);
      }
    })
  );

  // passport.serializeUser((user, done) => {
  //   done(null, user._id);
  // });

  // passport.deserializeUser(async (id, done) => {
  //   let user = await userModel.findById(id);
  //   done(null, user);
  // });
};

export default initializePassport;
