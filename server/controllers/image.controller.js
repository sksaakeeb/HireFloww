import cloudinary from "../configs/cloudinary.js";
import User from "../models/user.model.js";

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user data found" });
    }

    // Convert buffer to base64
    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(fileBase64, {
      folder: "hirefloww_profiles",
      transformation: [{ width: 500, height: 500, crop: "fill" }],
    });

    // Update MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: uploadRes.secure_url },
      { new: true, runValidators: true }, // 'new: true' returns the modified document
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      profileImage: updatedUser.profileImage, // This is the Cloudinary URL
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Internal server error during upload" });
  }
};

export const deleteProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user?.profileImage) {
      return res.status(200).json({ message: "No image to delete" });
    }

    // Extract Public ID (The string after the last slash and before the dot)
    const publicId = user.profileImage.split("/").pop().split(".")[0]; // ".../hirefloww_profiles/abc123xyz.png" -> "abc123xyz"

    // Delete from Cloudinary (Include the folder name!)
    await cloudinary.uploader.destroy(`hirefloww_profiles/${publicId}`);

    // Clear the link in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: "" },
      { new: true },
    );

    res.status(200).json({
      message: "Profile image removed",
      profileImage: updatedUser.profileImage,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete image" });
  }
};
