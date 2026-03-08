import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/stats", protectedRoute, getDashboardStats);

export default router;
