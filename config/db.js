const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI;

async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    console.log("✓ MongoDB connected successfully");
  } catch (err) {
    console.error("✗ MongoDB connection error:", err.message);
  }
}

module.exports = { connectDB };
