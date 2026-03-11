import express from "express";

import {
  uploadProfileImage,
  deleteProfileImage,
} from "../controllers/image.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  protectedRoute,
  upload.single("profilePic"), // Multer middleware
  uploadProfileImage,
);

router.delete("/delete", protectedRoute, deleteProfileImage);

export default router;
