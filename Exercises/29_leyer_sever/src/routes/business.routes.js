import { Router } from "express";
import * as Business from "../controllers/business.controller.js";

const businessRouter = Router();

businessRouter.get("/", Business.getBusinesses);
businessRouter.get("/:bid", Business.getBusinessById);
businessRouter.post("/", Business.createBusiness);
businessRouter.post("/:bid/product", Business.addProduct);

export default businessRouter;
