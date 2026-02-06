const Job = require("../models/Job");
const Resume = require("../models/Resume");
const SavedJob = require("../models/SavedJob");

async function getRecommendedJobsForUser(userId) {
  try {
    // Get user's resume
    const resume = await Resume.findOne({ user: userId, isPrimary: true });

    // Get user's saved jobs to exclude
    const savedJobs = await SavedJob.find({ user: userId }).distinct("job");

    // Search for jobs matching skills and preferences
    let query = { status: "open", isHidden: false, _id: { $nin: savedJobs } };

    if (resume && resume.parsedSkills && resume.parsedSkills.length > 0) {
      query.skills = { $in: resume.parsedSkills };
    }

    const jobs = await Job.find(query).populate("company").limit(20).lean();

    return jobs;
  } catch (err) {
    console.error("Error getting recommendations:", err);
    return [];
  }
}

async function getRecommendationsForJob(jobId, job) {
  try {
    // This would find matching candidates for a job
    // For now, return empty array - could implement ML matching later
    return [];
  } catch (err) {
    console.error("Error getting job recommendations:", err);
    return [];
  }
}

module.exports = { getRecommendedJobsForUser, getRecommendationsForJob };
