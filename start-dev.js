require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Mock database for development without MongoDB
const mockDB = {
  users: [],
  jobs: [],
  applications: [],
  resumes: [],
  savedJobs: []
};

// Create a simple server without MongoDB dependency
const app = express();
// sending your jwt secret express key to const app

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Mock auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  // For development, accept any token
  req.user = { id: '1', email: 'test@example.com', role: 'jobseeker' };
  next();
};

const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    req.user = { id: '1', email: 'test@example.com', role: 'jobseeker' };
  }
  next();
};

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running (development mode)" });
});

// Mock auth routes
app.post("/api/auth/register", (req, res) => {
  res.json({ success: true, message: "User registered (mock)" });
});

app.post("/api/auth/login", (req, res) => {
  res.json({ 
    success: true, 
    token: "mock-jwt-token",
    user: { id: '1', email: req.body.email, role: 'jobseeker' }
  });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Mock jobs routes
app.get("/api/jobs", optionalAuth, (req, res) => {
  res.json({
    success: true,
    jobs: [
      {
        _id: '1',
        title: 'Frontend Developer',
        company: 'Tech Company',
        location: 'Remote',
        type: 'Full-time',
        description: 'Great frontend developer role',
        requirements: 'React, JavaScript, CSS',
        salary: '$80k - $120k',
        postedAt: new Date().toISOString()
      }
    ],
    totalPages: 1,
    currentPage: 1
  });
});

app.get("/api/jobs/:id", optionalAuth, (req, res) => {
  res.json({
    success: true,
    job: {
      _id: req.params.id,
      title: 'Frontend Developer',
      company: 'Tech Company',
      location: 'Remote',
      type: 'Full-time',
      description: 'Great frontend developer role',
      requirements: 'React, JavaScript, CSS',
      salary: '$80k - $120k',
      postedAt: new Date().toISOString()
    }
  });
});

// Mock other routes
app.get("/api/applications", authMiddleware, (req, res) => {
  res.json({ success: true, applications: [] });
});

app.get("/api/resumes", authMiddleware, (req, res) => {
  res.json({ success: true, resumes: [] });
});

app.get("/api/saved", authMiddleware, (req, res) => {
  res.json({ success: true, savedJobs: [] });
});

app.get("/api/recommendations/jobs", authMiddleware, (req, res) => {
  res.json({ success: true, jobs: [] });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Development server running on port ${PORT}`);
  console.log(`📡 Mock API available at http://localhost:${PORT}/api`);
  console.log(`🔗 Frontend should be at http://localhost:5173`);
});
