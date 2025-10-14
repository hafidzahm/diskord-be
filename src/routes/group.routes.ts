import express from "express";
import GroupController from "../controllers/group.controller.ts";
import AuthMiddleware from "../middlewares/auth.middleware.ts";
import multer from "multer";
import {
  storageFreeGroupPhoto,
  storagePaidGroupPhoto,
} from "../utils/multer.ts";
const groupRoutes = express.Router();

const uploadFreeGroupPhoto = multer({
  storage: storageFreeGroupPhoto,
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    }
    callback(null, false);
  },
});

const uploadPaidGroupPhoto = multer({
  storage: storagePaidGroupPhoto,

  // fileFilter(req, file, callback) {
  //   if (file.filename === "assets") {
  //     callback(null, true);
  //   }
  //   if (file.mimetype.startsWith("image/")) {
  //     callback(null, true);
  //   }
  //   callback(null, false);
  // },
});

groupRoutes.post(
  "/groups/free",
  AuthMiddleware,
  uploadFreeGroupPhoto.single("photo"),
  GroupController.createFreeGroup
);

groupRoutes.post(
  "/groups/paid",
  AuthMiddleware,
  uploadPaidGroupPhoto.fields([
    { name: "photo", maxCount: 1 },
    { name: "assets" },
  ]),
  GroupController.createPaidGroup
);

groupRoutes.put(
  "/groups/free/:groupId",
  AuthMiddleware,
  uploadFreeGroupPhoto.single("photo"),
  GroupController.updateFreeGroup
);

groupRoutes.get(
  "/groups/search/:groupId",
  AuthMiddleware,
  GroupController.getGroupById
);

export default groupRoutes;
