import express from "express";
import GroupController from "../controllers/group.controller.ts";
import AuthMiddleware from "../middlewares/auth.middleware.ts";
const groupRoute = express.Router();

groupRoute.post("/group/free", AuthMiddleware, GroupController.createFreeGroup);

export default groupRoute;
