const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI;

async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    // console.log("URI:", MONGODB_URI.replace(/:[^:]*@/, ":****@")); // Hide password

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    console.log("✓ MongoDB connected successfully");
  } catch (err) {
    console.error("✗ MongoDB connection error:", err.message);
    console.error("\nTroubleshooting:");
    console.error("1. Check your IP is whitelisted in MongoDB Atlas");
    console.error("2. Verify MONGODB_URI credentials in .env");
    console.error("3. Ensure cluster is active and not paused");
    console.error("4. Check network/firewall isn't blocking port 27017");
    process.exit(1);
  }
}

module.exports = { connectDB };
