import mongoose from "mongoose";

 const connectDB = async (DATABASE_URL: string) => {
  try {
    const DB_OPTIONS = {
      dbName: "typeEmailTest",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected Successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;