import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";
import { generateJWT } from "../utils/jwt.js";
import { generateOTP } from "../utils/otp.js";
import { sendVerificationEmail } from "../utils/sendMail.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const OTP = generateOTP();

    const newUser = await User.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      verificationOTP: OTP,
      verificationOTPExpiresAt: Date.now() + 1 * 60 * 60 * 1000,
    });

    await sendVerificationEmail(newUser.email, newUser.verificationOTP);

    res.status(201).json({
      message: "Registration successful. Please verify your email.",
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating account" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email before logging in.",
      });
    }

    const token = generateJWT(res, user._id);

    res
      .status(200)
      .json({ token, user: { id: user._id, fullName: user.fullName } });
  } catch (error) {
    res.status(500).json({ message: "Error in login controller" });
  }
};

export const logout = async (_, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in logout controller" });
  }
};

export const getMe = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Error in getMe controller" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "OTP is required" });
  }

  try {
    const user = await User.findOne({
      verificationOTP: code,
      verificationOTPExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpiresAt = undefined;

    await user.save();

    // Send welcome email

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
