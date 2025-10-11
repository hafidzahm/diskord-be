import express from "express";
import multer from "multer";
import { storageUserPhoto } from "../utils/multer.js";
import UserController from "../controllers/user.controller.js";
const userRoutes = express.Router();

const uploadPhoto = multer({
  storage: storageUserPhoto,
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    }
    callback(null, false);
  },
});

userRoutes.post(
  "/auth/sign-up",
  uploadPhoto.single("photo"),
  UserController.signUp
);

export default userRoutes;
