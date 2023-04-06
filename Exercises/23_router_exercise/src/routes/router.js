import { Router } from "express";
import jwt from "jsonwebtoken";

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
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
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
        console.log(error);
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

  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === "PUBLIC") return next();
    const authHeaders = req.headers.authorization;
    console.log(authHeaders);
    if (!authHeaders) return res.status(401).send({ error: "Unauthorized" });
    const token = authHeaders.split(" ")[1];
    let user = jwt.verify(token, "mello");
    if (!policies.includes(user.role.toUpperCase()))
      return res.status(403).send({ error: "User with no policies" });
    req.user = user;
    next();
  };
}

export default Routers;
