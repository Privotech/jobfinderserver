require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const { authMiddleware, optionalAuth } = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

// Routes
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");
const profileRoutes = require("./routes/profile");
const employerRoutes = require("./routes/employer");
const adminRoutes = require("./routes/admin");
const applicationsRoutes = require("./routes/applications");
const resumesRoutes = require("./routes/resumes");
const savedRoutes = require("./routes/saved");
const recommendationsRoutes = require("./routes/recommendations");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", optionalAuth, jobsRoutes);
app.use("/api/recommendations", authMiddleware, recommendationsRoutes);

// Protected routes
app.use("/api/profile", authMiddleware, profileRoutes);
app.use("/api/applications", authMiddleware, applicationsRoutes);
app.use("/api/resumes", authMiddleware, resumesRoutes);
app.use("/api/saved", authMiddleware, savedRoutes);
app.use("/api/employer", authMiddleware, employerRoutes);
app.use("/api/admin", authMiddleware, adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
