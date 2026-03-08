// import jwt from "jsonwebtoken";

// import { User } from "../models/user.model.js";

// // // // Protected Route Middleware
// // // export const protectedRoute = async (req, res, next) => {
// // //   const token = req.cookies.token;

// // //   if (!token) {
// // //     return res.status(400).json({ message: "Not authorized" });
// // //   }

// // //   try {
// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// // //     req.user = await User.findById(decoded.id).select("-password");

// // //     next();
// // //   } catch (error) {
// // //     res.status(500).json({ message: "Token failed" });
// // //   }
// // // };

// // import jwt from "jsonwebtoken";
// // import { User } from "../models/user.model.js";

// // export const protectedRoute = async (req, res, next) => {
// //   const token = req.cookies.token;

// //   if (!token) {
// //     return res.status(401).json({ message: "Not authorized" });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     const user = await User.findById(decoded.userId);

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     req.user = user;

// //     next();

// //   } catch (error) {
// //     console.log(error);
// //     res.status(401).json({ message: "Token failed" });
// //   }
// // };

// // export const protectedRoute = async (req, res, next) => {
// //   const token = req.cookies.token;

// //   if (!token) {
// //     return res.status(401).json({ message: "Not authorized" });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     const user = await User.findById(decoded.id).select("-password");

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     req.user = user;

// //     next();

// //   } catch (error) {
// //     console.log(error);
// //     res.status(401).json({ message: "Token failed" });
// //   }
// // };

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
