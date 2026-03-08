import Job from "../models/job.model.js";

// Create New Job Controller
export const createJob = async (req, res) => {
  const {
    companyName,
    location,
    jobRole,
    jobPackage,
    driveDate,
    status,
    notes,
  } = req.body;

  try {
    const newJob = await Job.create({
      userId: req.user._id, // From protectedRoute Middleware
      companyName,
      location,
      jobRole,
      jobPackage,
      driveDate,
      status,
      notes,
    });

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Error in createJob controller" });
    console.log(error);
  }
};

export const allJob = async (req, res) => {
  try {
    const allJob = await Job.find({ userId: req.user._id })
      .select("companyName location")
      .sort({ createdAt: -1 });

    res.status(200).json(allJob);
  } catch (error) {
    res.status(500).json({ message: "Error in allJob controller" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });

    if (!job) {
      return res.status(400).json({ message: "No job found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error in getJobById controller" });
  }
};

export const updateJob = async (req, res) => {
  const {
    companyName,
    location,
    jobRole,
    jobPackage,
    driveDate,
    status,
    notes,
  } = req.body;

  try {
    const job = await Job.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.companyName = companyName ?? job.companyName;
    job.location = location ?? job.location;
    job.jobRole = jobRole ?? job.jobRole;
    job.package = jobPackage ?? job.package;
    job.driveDate = driveDate ?? job.driveDate;
    job.status = status ?? job.status;
    job.notes = notes ?? job.notes;

    const updatedJob = await job.save();

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating job" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting job" });
  }
};
