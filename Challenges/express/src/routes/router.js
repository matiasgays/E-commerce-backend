import { Router } from "express";
import { passportCall } from "../utils.js";
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
      res.send({ status: 200, payload });
    };

    res.sendError = (code, error) => {
      const newError = new CustomError(code, error);
      res.send(newError.createError());
    };
    next();
  };

  //
  handlePolicies = (policies) => async (req, res, next) => {
    if (!req.user.role) {
      if (policies.includes("PUBLIC")) return next();
      return res.status(401).redirect("/login");
    }
    if (!policies.includes(req.user.role.toUpperCase()))
      return res.status(403).send({ error: "User with bad policies" });
    next();
  };
}

export default Routers;
