const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

function getHostFromUri(uri) {
  try {
    const url = new URL(uri);
    return url.host;
  } catch (e) {
    return "(unknown)";
  }
}

async function connectDB() {
  if (!MONGODB_URI) {
    console.error("✗ MONGODB_URI is not set in environment");
    return;
  }

  try {
    console.log("Connecting to MongoDB... host:", getHostFromUri(MONGODB_URI));

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 10000,
    });

    console.log("✓ MongoDB connected successfully");
  } catch (err) {
    console.error("✗ MongoDB connection error:", err);
    if (err && err.stack) console.error(err.stack);
  }
}

module.exports = { connectDB };