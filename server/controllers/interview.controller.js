import interviewModel from "../models/interview.model.js";
import Interview from "../models/interview.model.js";
import Job from "../models/job.model.js";

export const createInterview = async (req, res) => {
  const { roundType, date, feedback, assignment } = req.body;
  const { jobId } = req.params;

  try {
    const job = await Job.findOne({ _id: jobId, userId: req.user._id });

    if (!job) {
      return res.status(400).json({ message: "Job not found" });
    }

    const interview = await Interview.create({
      userId: req.user._id,
      jobId,
      roundType,
      date,
      feedback,
      assignment,
    });

    job.status = roundType;
    await job.save();

    res.status(201).json(interview);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in createInterview controller",
      error: error.message,
    });
  }
};

export const allInterview = async (req, res) => {
  try {
    const filter = { userId: req.user._id };

    const allInterview = await interviewModel
      .find(filter)
      .sort({ date: 1 })
      .populate("jobId", "companyName jobRole");

    res.status(200).json(allInterview);
  } catch (error) {
    res.status(500).json({ message: "Error fetching interviews" });
  }
};

// export const getInterviewById = async (req, res) => {
//   try {
//     const interview = await Interview.findOne({
//       _id: req.params.id,
//       userId: req.user.id,
//     });

//     if (!interview) {
//       return res.status(400).json({ message: "No interview found" });
//     }

//     res.status(200).json(interview);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching interview details" });
//   }
// };

export const getInterviewsByJobId = async (req, res) => {
  try {
    // We use .find() to get an array of all interviews linked to this Job
    const interviews = await Interview.find({
      jobId: req.params.jobId, // Ensure this matches your route parameter
      userId: req.user._id || req.user.id, // Handles both passport and custom JWT formats
    }).sort({ date: -1 }); // Sort by newest interview first

    // Note: We return a 200 even if the array is empty [] 
    // This prevents the frontend from crashing on new jobs
    res.status(200).json(interviews);
  } catch (error) {
    console.error("Error in getInterviewsByJobId:", error);
    res.status(500).json({ message: "Error fetching interview details" });
  }
};

export const updateInterview = async (req, res) => {};

export const deleteInterview = async (req, res) => {};
