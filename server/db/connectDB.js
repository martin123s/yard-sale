import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connects successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error on connecting mongodb: ", error.message);
    process.exit(1)
  }
};