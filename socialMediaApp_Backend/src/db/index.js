import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionINS = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`\nmongoDB connected\nhost:${connectionINS.connection.host}`);
  } catch (error) {
    console.log("mongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
