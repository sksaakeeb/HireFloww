import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

// Signup Controller
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // 0. Basic Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. Check If User Already Exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create New User
    const newUser = await User.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    // 4. Generate JWT Utils
    const token = generateToken(res, newUser._id);

    res
      .status(201)
      .json({ token, user: { id: newUser._id, fullName: newUser.fullName } });
  } catch (error) {
    res.status(500).json({ message: "Error in signup controller" });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(res, user._id);
    res
      .status(200)
      .json({ token, user: { id: user._id, fullName: user.fullName } });
  } catch (error) {
    res.status(500).json({ message: "Error in login controller" });
  }
};

// Logout Controller
export const logout = async (_, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in logout controller" });
  }
};

// Get Me Controller
export const getMe = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Error in getMe controller" });
  }
};

// Verify Email Controller
export const verifyEmail = async (req, res) => {};

// Forgot Password Controller
export const forgotPassword = async (req, res) => {};

// Reset Password Controller
export const resetPassword = async (req, res) => {};
