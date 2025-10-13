import express from "express";
import userRoutes from "./user.routes.ts";
import groupRoutes from "./group.routes.ts";
const route = express.Router();

route.use("/api", groupRoutes);
route.use("/api", userRoutes);

export default route;
