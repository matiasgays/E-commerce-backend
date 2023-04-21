import bcrypt from "bcrypt";
import passport from "passport";
import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "../");

export default __dirname;

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = () => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).redirect("/login");
    next();
  };
};

export const mockingProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: faker.image.image(),
    code: faker.datatype.uuid(),
    stock: faker.random.numeric(1),
    status: faker.datatype.boolean(),
    category: faker.commerce.product(),
  };
};

export const handleRes = (req, res, code, payload) => {
  const log = `${req.method} in ${
    req._parsedOriginalUrl.pathname
  } - ${new Date().toLocaleTimeString()}`;

  if (parseInt(code) >= 400) {
    req.logger.error(log);
    res.sendError(code, payload);
  } else {
    req.logger.info(log);
    res.sendSuccess(payload);
  }
};
