import express from "express";
import GroupController from "../controllers/group.controller.ts";
const groupRoute = express.Router();

groupRoute.post("/group/free", GroupController.createFreeGroup);

export default groupRoute;
