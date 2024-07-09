import multer from "multer";

import HttpError from "../models/http-Error.js";

const MIMI_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
export const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "backend/uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIMI_TYPE_MAP[file.mimetype];
      cb(null, Date.now() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIMI_TYPE_MAP[file.mimetype]; // converting null and undifine to false with 2 exclamaition.
    let error = isValid ? null : new HttpError("Invalid mime type", 422);
    cb(error, isValid);
  },
});
