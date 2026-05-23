import mongoose from "mongoose";

const LOCAL_MONGO = "mongodb://localhost:27017/ReactProject";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || LOCAL_MONGO;
    const resolvedUri = uri.startsWith("mongodb+srv") ? LOCAL_MONGO : uri;
    const conn = await mongoose.connect(resolvedUri);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
