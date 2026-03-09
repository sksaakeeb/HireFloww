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

// export const getInterviewsByJobId = async (req, res) => {
//   try {
//     // We use .find() to get an array of all interviews linked to this Job
//     const interviews = await Interview.find({
//       jobId: req.params.jobId, // Ensure this matches your route parameter
//       userId: req.user._id || req.user.id, // Handles both passport and custom JWT formats
//     }).sort({ date: -1 }); // Sort by newest interview first

//     // Note: We return a 200 even if the array is empty []
//     // This prevents the frontend from crashing on new jobs
//     res.status(200).json(interviews);
//   } catch (error) {
//     console.error("Error in getInterviewsByJobId:", error);
//     res.status(500).json({ message: "Error fetching interview details" });
//   }
// };

export const getInterviewsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // 1. Extract User ID safely from req.user
    // Handles various auth middleware patterns (req.user._id or req.user.id)
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // 2. Verification: Ensure the job actually belongs to this user
    // This prevents a user from viewing interviews of a job they don't own
    const jobExists = await Job.findOne({ _id: jobId, userId });
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found or access denied" });
    }

    // 3. Fetch Interviews
    // Sorting by date: -1 (Newest first) or 1 (Timeline order)
    const interviews = await Interview.find({
      jobId,
      userId,
    }).sort({ date: 1 }); // Changed to 1 for chronological "Timeline" view

    // 4. Return result (even if empty array [])
    return res.status(200).json(interviews);

  } catch (error) {
    console.error("Error in getInterviewsByJobId:", error.message);
    
    // Handle CastError (Invalid MongoDB ID format)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Job ID format" });
    }

    return res.status(500).json({ message: "Server error while fetching interviews" });
  }
};

export const updateInterview = async (req, res) => {
  try {
    const { id } = req.params; // Matches the ":id" in the route
    const userId = req.user._id;
    const { roundType, date, feedback, assignment } = req.body;

    const interview = await Interview.findOneAndUpdate(
      { _id: id, userId }, // Verify ownership
      { roundType, date, feedback, assignment },
      { new: true }, // Return the updated document
    );

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const interview = await Interview.findOne({ _id: id, userId });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found or unauthorized",
      });
    }

    await Interview.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Interview round deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteInterview controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error during deletion",
    });
  }
};
