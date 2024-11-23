const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.CONNECTION_STRING);  // Add this line for debugging
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`MongoDB connection successful || HOST ${connect.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
