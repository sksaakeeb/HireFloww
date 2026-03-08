import express from "express";
import {
  deleteInterview,
  updateInterview,
  getInterviewsByJobId,
  allInterview,
  createInterview,
} from "../controllers/interview.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-interview/:jobId", protectedRoute, createInterview);
router.get("/all-interview", protectedRoute, allInterview);
router.get("/:jobId", protectedRoute, getInterviewsByJobId);
router.put("/update-interview", protectedRoute, updateInterview);
router.delete("/:id", protectedRoute, deleteInterview);

export default router;
