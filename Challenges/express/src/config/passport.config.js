import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";
import githubStrategy from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
      },
      async (req, email, password, done) => {
        try {
          const { firstName, lastName, age } = req.body;
          const user = await userModel.findOne({ email });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          const newUser = {
            firstName,
            lastName,
            age,
            email,
            password: createHash(password),
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          throw new Error(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user || !isValidPassword(user, password))
            return done(null, false);
          delete user.password;
          return done(null, user);
        } catch (error) {
          throw new Error(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new githubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });
          if (user) {
            delete user.password;
            return done(null, user);
          }
          const newUser = {
            firstName: profile._json.name,
            lastName: "",
            age: 18,
            email: profile._json.email,
            password: "",
          };
          const result = await userModel.create(newUser);
          return done(null, true);
        } catch (error) {
          throw new Error({ status: 500, message: error });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
