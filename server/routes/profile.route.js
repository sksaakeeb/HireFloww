import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", protectedRoute, getProfile);
router.put("/update-profile", protectedRoute, updateProfile);

export default router;
