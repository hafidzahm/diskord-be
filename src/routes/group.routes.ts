import express from "express";
import GroupController from "../controllers/group.controller.ts";
import AuthMiddleware from "../middlewares/auth.middleware.ts";
import multer from "multer";
import { storageGroupPhoto } from "../utils/multer.ts";
const groupRoutes = express.Router();

const uploadGroupPhoto = multer({
  storage: storageGroupPhoto,
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    }
    callback(null, false);
  },
});

groupRoutes.post(
  "/group/free",
  AuthMiddleware,
  uploadGroupPhoto.single("photo"),
  GroupController.createFreeGroup
);

export default groupRoutes;
