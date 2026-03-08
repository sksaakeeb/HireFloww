import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: { type: String, required: true },
    location: { type: String },
    jobRole: { type: String, required: true },
    jobPackage: { type: String },
    driveDate: { type: Date },

    status: {
      type: String,
      enum: ["Applied", "HR", "Tech", "Final", "Offer", "Rejected"],
      default: "Applied",
    },
    notes: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Job", jobSchema);
