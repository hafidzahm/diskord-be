import multer from "multer";

export const storageUserPhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/uploads/photos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const extension = file.mimetype.split("/")[1]; // images/png -> [images, png]
    const filename = `photo-${uniqueSuffix}.${extension}`;
    cb(null, filename);
  },
});

export const storageFreeGroupPhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/uploads/groups/photos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const extension = file.mimetype.split("/")[1]; // images/png -> [images, png]
    const filename = `photo-${uniqueSuffix}.${extension}`;
    cb(null, filename);
  },
});

export const storagePaidGroupPhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "photo") {
      cb(null, "public/assets/uploads/groups/photos");
    } else {
      cb(null, "public/assets/uploads/groups/assets");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const extension = file.mimetype.split("/")[1]; // images/png -> [images, png]
    const filename = `${file.fieldname}-${uniqueSuffix}.${extension}`;
    cb(null, filename);
  },
});
