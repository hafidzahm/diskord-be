import express from "express";
import multer from "multer";
import { storageUserPhoto } from "../utils/multer.ts";
import UserController from "../controllers/user.controller.ts";
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

userRoutes.post("/auth/sign-in", UserController.signIn);
userRoutes.post("/auth/reset-password", UserController.getEmailReset);
userRoutes.put("/auth/reset-password/:tokenId", UserController.updatePassword);

export default userRoutes;
