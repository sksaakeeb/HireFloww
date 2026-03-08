import mongoose from "mongoose";

export const connDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.log("CONNECTION FAILED", error);
  }
};
