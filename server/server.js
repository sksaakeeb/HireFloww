import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import jobRoute from "./routes/job.route.js";
import interviewRoute from "./routes/interview.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import userRoute from "./routes/profile.route.js";
import imageRoute from "./routes/image.route.js";
import companyRoute from "./routes/company.route.js";

import { connDB } from "./configs/db.js";
import { limiter } from "./utils/rateLimit.js";
import { connectCloudinary } from "./configs/cloudinary.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(limiter);

app.use(express.json());

app.use(cookieParser());

// All routes
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/interviews", interviewRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/users", userRoute);
app.use("/api/images", imageRoute);
app.use("/api/companies", companyRoute);

connDB().then(() => {
  connectCloudinary();
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
