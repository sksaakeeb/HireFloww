import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      // required: true,
    },

    roundType: { type: String, required: true },
    date: { type: Date, required: true },
    feedback: { type: String },
    assignment: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Interview", interviewSchema);
