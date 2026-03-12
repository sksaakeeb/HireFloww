import express from "express";

import { getCompanyDetails } from "../controllers/company.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/search/:name", protectedRoute, getCompanyDetails);

export default router;
