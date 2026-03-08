import Job from "../models/job.model.js";
import Interview from "../models/interview.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalJobs = await Job.countDocuments({ userId });

    const totalInterviews = await Interview.countDocuments({ userId });

    const offers = await Job.countDocuments({ userId, status: "Offer" });

    const rejected = await Job.countDocuments({ userId, status: "Rejected" });

    const active = totalJobs - offers - rejected;

    res
      .status(200)
      .json({ totalJobs, totalInterviews, offers, rejected, active });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
    console.log(error);
  }
};
