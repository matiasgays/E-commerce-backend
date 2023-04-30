import { Router } from "express";
import { passportCall } from "../utils/utils.js";
import CustomError from "../services/errors/CustomError.js";

class Routers {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      passportCall("current"),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      passportCall("current"),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      passportCall("current"),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      passportCall("current"),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callbacks) => async (...params) => {
      try {
        await callbacks.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => {
      res.status(200).send({ status: 200, payload });
    };

    res.sendError = (code, error) => {
      const newError = new CustomError(code, error);
      res.status(code).send(newError.createError());
    };
    next();
  };

  //
  handlePolicies = (policies) => async (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    if (!req.user)
      return res
        .status(401)
        .send({ error: "Unauthorized. You must be an user" });
    if (!policies.includes(req.user.role))
      return res.status(403).send({ error: "User with bad policies" });
    next();
  };
}

export default Routers;
