import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    verificationOTP: String,
    verificationOTPExpiresAt: Date,
    resetPasswordOTP: String,
    resetPasswordOTPExpiresAt: Date,
  },
  { timeStamps: true },
);

export const User = mongoose.model("User", userSchema);
export default User;
