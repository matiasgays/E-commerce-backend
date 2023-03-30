import express from "express";
import { getToys, saveToy } from "../controllers/toys.controller.js";

const toysRouter = express.Router();

toysRouter.get("/", getToys);
toysRouter.post("/", saveToy);

export default toysRouter;
