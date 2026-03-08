import express from "express";
import {
  createJob,
  allJob,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-job", protectedRoute, createJob);
router.get("/all-jobs", protectedRoute, allJob);
router.get("/:id", protectedRoute, getJobById);
router.put("/:id", protectedRoute, updateJob);
router.delete("/:id", protectedRoute, deleteJob);

export default router;
