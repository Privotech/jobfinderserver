require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { connectDB } = require("./config/db");

const User = require("./models/User");
const Company = require("./models/Company");
const Job = require("./models/Job");

async function seedData() {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});

    console.log("Creating seed data...");

    // Create sample users
    const password = await bcrypt.hash("password123", 10);

    const jobSeeker = await User.create({
      email: "jobseeker@example.com",
      passwordHash: password,
      name: "John Seeker",
      role: "job_seeker",
      location: "San Francisco, CA",
      profile: {
        headline: "Full Stack Developer",
        experienceSummary: "5 years of experience in web development",
        skills: ["JavaScript", "React", "Node.js", "MongoDB"],
        yearsOfExperience: 5,
        preferredLocations: ["San Francisco", "Remote"],
        preferredRoles: ["Full Stack Developer", "Frontend Developer"],
      },
    });

    const employer = await User.create({
      email: "employer@example.com",
      passwordHash: password,
      name: "Jane Employer",
      role: "employer",
      location: "San Francisco, CA",
    });

    const admin = await User.create({
      email: "admin@example.com",
      passwordHash: password,
      name: "Admin User",
      role: "admin",
    });

    console.log("✓ Users created");

    // Create sample company
    const company = await Company.create({
      name: "Tech Innovations Inc.",
      owner: employer._id,
      description: "A leading technology company focused on web solutions",
      website: "https://techinnovations.example.com",
      locations: ["San Francisco, CA", "New York, NY", "Remote"],
      logoUrl: "https://via.placeholder.com/200?text=Tech+Innovations",
    });

    console.log("✓ Company created");

    // Create sample jobs
    const jobs = await Job.create([
      {
        title: "Senior Full Stack Developer",
        description:
          "We are looking for an experienced Full Stack Developer to join our growing team. You will work on cutting-edge web technologies and build scalable applications.",
        requirements:
          "5+ years experience with Node.js and React, MongoDB, AWS knowledge preferred",
        location: "San Francisco, CA",
        salaryMin: 120000,
        salaryMax: 160000,
        employmentType: "full_time",
        tags: ["Remote", "Senior", "Competitive Salary"],
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
        company: company._id,
        creator: employer._id,
        status: "open",
      },
      {
        title: "Frontend React Developer",
        description:
          "Join our frontend team and help us build beautiful, responsive web applications using React and modern JavaScript.",
        requirements:
          "3+ years with React, CSS/Sass, TypeScript optional but preferred",
        location: "Remote",
        salaryMin: 80000,
        salaryMax: 120000,
        employmentType: "full_time",
        tags: ["Remote", "Mid-level"],
        skills: ["React", "JavaScript", "CSS", "Responsive Design"],
        company: company._id,
        creator: employer._id,
        status: "open",
      },
      {
        title: "Backend Node.js Developer",
        description:
          "Build and maintain robust backend services with Node.js. Work with microservices, databases, and cloud infrastructure.",
        requirements:
          "4+ years Node.js, Experience with REST APIs, SQL and NoSQL databases",
        location: "New York, NY",
        salaryMin: 100000,
        salaryMax: 140000,
        employmentType: "full_time",
        tags: ["On-site", "Mid-level"],
        skills: ["Node.js", "JavaScript", "MongoDB", "PostgreSQL", "Docker"],
        company: company._id,
        creator: employer._id,
        status: "open",
      },
      {
        title: "Junior Web Developer Internship",
        description:
          "Great opportunity for someone starting their web development career. Learn from experienced developers while building real projects.",
        requirements:
          "Basic HTML, CSS, JavaScript knowledge. Enthusiasm to learn",
        location: "San Francisco, CA",
        salaryMin: 25000,
        salaryMax: 35000,
        employmentType: "internship",
        tags: ["Internship", "Entry-level"],
        skills: ["HTML", "CSS", "JavaScript"],
        company: company._id,
        creator: employer._id,
        status: "open",
      },
    ]);

    console.log("✓ Jobs created");

    console.log("\n Seed data created successfully!");
    console.log("\nTest accounts:");
    console.log("Job Seeker: jobseeker@example.com / password123");
    console.log("Employer: employer@example.com / password123");
    console.log("Admin: admin@example.com / password123");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seedData();
