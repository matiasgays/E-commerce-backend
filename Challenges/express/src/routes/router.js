import { Router } from "express";
import jwt from "jsonwebtoken";
import { passportCall } from "../utils.js";

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

  getLogin(path, policies, ...callbacks) {
    this.router.get(
      path,
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

  postLogin(path, policies, ...callbacks) {
    this.router.post(
      path,
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

    res.sendError = (error) => {
      res.send({ status: 500, error });
    };
    res.sendUserError = (error) => {
      res.send({ status: 400, error });
    };
    next();
  };

  //
  handlePolicies = (policies) => async (req, res, next) => {
    if (policies[0] === "PUBLIC") return next();
    if (!policies.includes(req.user.role.toUpperCase()))
      return res.status(403).send({ error: "User with bad policies" });
    next();
  };
}

export default Routers;
